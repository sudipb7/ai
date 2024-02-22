import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const feedbackSchema = z.object({
  email: z.string().email("Invalid email"),
  description: z.string().min(10, "Please enter atleast 10 characters."),
});
