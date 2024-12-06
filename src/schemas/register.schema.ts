import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().trim().email("Please enter a valid email!"),
  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at least 6 characters!"),
  address: z.string().min(1, "Please enter your address!"),
  profilePhoto: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // File size validation (5MB max)
      "Image must be less than 5MB!"
    )
    // .refine(
    //   (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
    //   "Invalid file type! Only JPEG, PNG, and GIF are allowed."
    // ),
});

export default registerValidationSchema;
