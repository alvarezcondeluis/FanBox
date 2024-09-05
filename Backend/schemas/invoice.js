import { z } from 'zod';

const invoiceSchema = z.object({
  
  date: z.string({
    required_error: 'Date is required',
    invalid_type_error: 'Date must be a string'
  }).date(),
  vat: z.number({
    required_error: 'VAT is required',
    invalid_type_error: 'VAT must be a number'
  }).min(0).max(100).default(21.00),

  isPayed: z.boolean().transform(val => val ? 1 : 0),

  amount: z.number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a number'
  }).positive(),

  orderID: z.string({
    required_error: 'Order ID is required',
    invalid_type_error: 'Order ID must be a string'
  }).uuid()
});

export function validateInvoice(input) {
  return invoiceSchema.safeParse(input);
}

export function validatePartialInvoice(input) {
  return invoiceSchema.partial().safeParse(input);
}
