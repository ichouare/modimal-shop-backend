import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import z from 'zod'

extendZodWithOpenApi(z)

const ParamsSchema = z.object({
  id: z.string().openapi({
    description: 'ID of the resource',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),
})

export type Params = z.infer<typeof ParamsSchema>;

export { ParamsSchema }
