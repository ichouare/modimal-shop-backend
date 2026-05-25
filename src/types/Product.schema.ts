import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const ImagesZodSchema = z
  .object({
    thumbnail: z.string().url('Thumbnail must be a valid URL').openapi({
      example: 'https://example.com/thumb.jpg',
    }),
    images: z
      .array(z.string().url('Image must be a valid URL'))
      .optional()
      .openapi({ description: 'Additional product image URLs' }),
    color: z.string().optional().openapi({ example: 'navy' }),
  })
  .openapi('ProductImage')

export const ProductZodSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters').openapi({
      example: 'Classic Oxford Shirt',
    }),
    description: z.string().optional(),
    images: z.array(ImagesZodSchema).min(1, 'At least one image is required'),
    size: z
      .array(z.string())
      .optional()
      .openapi({ example: ['S', 'M', 'L'] }),
    price: z
      .number()
      .min(0, 'Price cannot be negative')
      .openapi({ example: 49.99 }),
    currency: z.string().default('MAD'),
    stock: z.number().min(0).default(0).openapi({ example: 100 }),
    soldOut: z.boolean().optional(),
    careAdvices: z.string().optional(),
    fabric: z.string().optional().openapi({ example: 'cotton' }),
    shipping: z.string().optional(),
    returnMethod: z.string().optional(),
  })
  .openapi('Product')

export const ProductListQuerySchema = z.object({
  title: z
    .string()
    .optional()
    .openapi({ description: 'Filter products by title (case-insensitive)' }),
  limit: z.coerce.number().optional().openapi({
    description: 'Maximum number of products to return',
    example: 3,
  }),
  page: z.coerce
    .number()
    .optional()
    .openapi({ description: 'Page number for pagination', example: 1 }),
})

export const ProductFilterQuerySchema = z.object({
  color: z
    .string()
    .optional()
    .openapi({ description: 'Filter by image color' }),
  size: z.string().optional().openapi({ description: 'Filter by size' }),
  fabric: z.string().optional().openapi({ description: 'Filter by fabric' }),
  sort: z.record(z.string(), z.coerce.number()).optional().openapi({
    description:
      'Sort fields as query object, e.g. sort[price]=-1 (requires extended query parser)',
  }),
})

export const ProductUploadSchema = z.object({
  image: z.any().openapi({
    type: 'string',
    format: 'binary',
    description: 'Image file (field name: image)',
  }),
})

export type TProductZodSchema = z.infer<typeof ProductZodSchema>;
