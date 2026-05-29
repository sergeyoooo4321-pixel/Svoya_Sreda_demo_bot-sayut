import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Укажите имя"),
  phone: z.string().min(7, "Укажите телефон"),
  product: z.string().optional().default(""),
  city: z.string().min(2, "Укажите город"),
  comment: z.string().optional().default(""),
  privacy: z.boolean().refine((value) => value, "Нужно согласие с политикой"),
  sourcePage: z.string().optional().default("")
});

export type LeadInput = z.infer<typeof leadSchema>;
