import { z } from 'zod';

const discountSchema = z.object({
  
  code: z.string({
    required_error: 'Code is required',
    invalid_type_error: 'Code must be a string'
  }),

  discount: z.number({
    required_error: 'Discount is required',
    invalid_type_error: 'Discount must be a number'
  }).min(0).max(100),

  startDate: z.string({
    required_error: 'Start Date is required',
    invalid_type_error: 'Start Date must be a string'
  }).refine(val => !isNaN(Date.parse(val)), {
    message: 'Start date must be a valid date'
  }),

  endDate: z.string({
    required_error: 'End Date is required',
    invalid_type_error: 'End Date must be a string'
  }).refine(val => !isNaN(Date.parse(val)), {
    message: 'End date must be a valid date'
  }).optional(),
});

export function validateDiscount(input) {
  return discountSchema.safeParse(input);
}

export function validatePartialDiscount(input) {
  return discountSchema.partial().safeParse(input);
}
