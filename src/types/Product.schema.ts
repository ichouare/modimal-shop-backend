import { z } from "zod";

// Images schema
export const ImagesZodSchema = z.object({
  thumbnail: z
    .string()
    .url("Thumbnail must be a valid URL"),

  images: z
    .array(z.string().url("Image must be a valid URL"))
    .optional(),

  colors: z.string().optional()
});

// Product schema
export const ProductZodSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .optional(),

  images: z
    .array(ImagesZodSchema)
    .min(1, "At least one image is required"),

  size: z
    .array(z.string())
    .optional(),

  price: z
    .number()
    .min(0, "Price cannot be negative"),

  currency: z
    .string()
    .default("MAD"),

  stock: z
    .number()
    .min(0)
    .default(0),

  soldOut: z
    .boolean()
    .optional(),

  careAdvices: z.string().optional(),

  fabric: z.string().optional(),

  shipping: z.string().optional(),

  returnMethod: z.string().optional(),
});


export type TProductZodSchema = z.infer<typeof ProductZodSchema>