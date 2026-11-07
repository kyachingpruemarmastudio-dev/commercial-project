import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  compareAt: z.coerce.number().positive().optional().nullable(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  categoryId: z.string().min(1, "Category is required"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
