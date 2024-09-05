import { z } from 'zod';
import {orderProductUnitSchema} from '../schemas/orderProductUnit.js';

const orderDataSchema = z.object({

  products: z.array(orderProductUnitSchema).nonempty({
      message: 'Products array must contain at least one item'
 }),

  amount: z.number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a number'
  }).positive(),

  userID: z.string({
    required_error: 'User ID is required',
    invalid_type_error: 'User ID must be a string'
  }).uuid(),

  discountID: z.string().uuid().optional(),
  addressID: z.number({
    required_error: 'Address ID is required',
    invalid_type_error: 'Address ID must be a number'
  }).int().positive(),
});

export function validateOrderData(input) {
  return orderDataSchema.safeParse(input);
}

export function validatePartialOrderData(input) {
  return orderDataSchema.partial().safeParse(input);
}
