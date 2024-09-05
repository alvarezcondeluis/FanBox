import { z } from 'zod';

const orderSchema = z.object({
  orderID: z.string({
    required_error: 'Order ID is required',
    invalid_type_error: 'Order ID must be a string'
  }).uuid(),

  date: z.string({
    required_error: 'Date is required',
    invalid_type_error: 'Date must be a string'
  }).date(),

  deliveryDate: z.string().date().optional(),

  amount: z.number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a number'
  }).positive(),

  userID: z.string({
    required_error: 'User ID is required',
    invalid_type_error: 'User ID must be a string'
  }).uuid(),

  discountID: z.string().uuid().optional()
});

export function validateOrder(input) {
  return orderSchema.safeParse(input);
}

export function validatePartialOrder(input) {
  return orderSchema.partial().safeParse(input);
}
