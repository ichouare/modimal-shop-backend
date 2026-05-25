import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const CheckoutItemSchema = z
  .object({
    _id: z.string().openapi({
      description: 'Product MongoDB id',
      example: '507f1f77bcf86cd799439011',
    }),
    name: z.string().openapi({
      description: 'Product display name',
      example: 'Cotton T-Shirt',
    }),
    price: z.number().openapi({ description: 'Unit price', example: 29.99 }),
    quantity: z.number().int().min(1).openapi({ example: 1 }),
    size: z.string().optional().openapi({ example: 'M' }),
    color: z.string().optional().openapi({ example: 'blue' }),
  })
  .openapi('CheckoutItem')

export const CreateCheckoutSessionSchema = z
  .object({
    items: z.array(CheckoutItemSchema).min(1),
  })
  .openapi('CreateCheckoutSessionBody')

export const UpdateOrderStatusSchema = z
  .object({
    order_id: z.string().openapi({
      description: 'ShoppingCart document id returned from checkout',
      example: '507f1f77bcf86cd799439011',
    }),
    success: z.boolean().openapi({
      description: 'Whether the Stripe payment completed successfully',
      example: true,
    }),
  })
  .openapi('UpdateOrderStatusBody')
