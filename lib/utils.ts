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

export const authSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Please enter atleast 6 characters."),
});

export type AuthSchema = z.infer<typeof authSchema>;
