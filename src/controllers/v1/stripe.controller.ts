import type { Request, Response } from 'express'
import Stripe from 'stripe'
import { sendError, sendSuccess } from '../../services/helpers'
import { ShoppingCart } from '../../modules/shoppingCart.module'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2026-04-22.dahlia' })
  : null
const currency = 'eur'
const deliveryCharge = 10

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    if (!stripe) {
      return sendError(
        res,
        {
          success: false,
          message: 'Stripe secret key is missing',
        },
        500
      )
    }

    const items = req.body?.items
    const origin = req.headers.origin
    const userId = req?.userId

    if (!userId) {
      return sendError(
        res,
        {
          success: false,
          message: 'Unauthorized User',
        },
        401
      )
    }

    if (!Array.isArray(items) || items.length === 0) {
      return sendError(
        res,
        {
          success: false,
          message: 'Cart is empty',
        },
        400
      )
    }

    if (!origin) {
      return sendError(
        res,
        {
          success: false,
          message: 'Origin header is required',
        },
        400
      )
    }

    const products = items.map((item: any) => ({
      ProductId: item._id,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.price,
    }))

    const total = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const checkoutCart = await ShoppingCart.create({
      user: userId,
      products,
      shipping: deliveryCharge,
      total,
      status: 'active',
    })

    const line_items = items.map((item: any) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&order_id=${checkoutCart._id}`,
      cancel_url: `${origin}/verify?success=false&order_id=${checkoutCart._id}`,
      line_items,
      mode: 'payment',
      payment_method_types: ['card'],
    })

    return sendSuccess(res, 200, {
      success: true,
      message: 'Checkout created successfully',
      data: {
        url: session.url,
        order_id: checkoutCart._id,
      },
    })
  } catch (err: unknown) {
    return sendError(res, {
      success: false,
      message: err?.message || 'Please try again',
    })
  }
}

export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { order_id, success } = req.body

    if (!order_id) {
      return sendError(
        res,
        {
          success: false,
          message: 'Order ID is required',
        },
        400
      )
    }

    if (success !== true && success !== false) {
      return sendError(
        res,
        {
          success: false,
          message: 'Success flag must be true or false',
        },
        400
      )
    }

    const checkoutCart = await ShoppingCart.findById(order_id)

    if (!checkoutCart) {
      return sendError(
        res,
        {
          success: false,
          message: 'Order not found',
        },
        404
      )
    }

    if (success === true) {
      checkoutCart.status = 'completed'
    } else {
      checkoutCart.status = 'cancelled'
    }

    await checkoutCart.save()

    return sendSuccess(res, 200, {
      success: true,
      message: `Order status updated to ${checkoutCart.status}`,
      data: {
        order_id: checkoutCart._id,
        status: checkoutCart.status,
      },
    })
  } catch (err: unknown) {
    return sendError(res, {
      success: false,
      message: err.message || 'Unable to update order status',
    })
  }
}
