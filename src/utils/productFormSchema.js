import { z } from "zod";

export const VariantSchema = z.object({
  color: z.string().min(1, "Color is required"),
  quantity: z.number().min(0, "Invalid quantity"),
  image: z.string().min(1, "Image is required"),
  unlimited: z.boolean({
    invalid_type_error: "Invalid field",
    required_error: "Required field",
  }),
});

export const ProductFormSchema = z.object({
  name: z.string().min(4, "Name is required"),
  price: z.number().positive().min(0.1, "Price must not be less than 0"),
  sizes: z.array(z.string()).min(1, "Size is required"),
  image: z.string().min(1, "Image is required"),
  variants: z.array(VariantSchema),
});
