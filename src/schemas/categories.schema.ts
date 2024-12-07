import { z } from "zod";

const createCategoryValidationSchema = z.object({
  name: z
    .string({
      required_error: "Please enter a category name",
    })
    .trim(),
  description: z
    .string({
      required_error: "Please enter a category description",
    })
    .trim(),
});

export default createCategoryValidationSchema;
