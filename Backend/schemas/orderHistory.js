import { z } from 'zod';

const orderHistorySchema = z.object({

  initialDate: z.string({
    required_error: 'Initial Date is required',
    invalid_type_error: 'Initial Date must be a string'
  }).date('Invalid date format'),

  status: z.enum(['Pendiente', 'Procesado', 'Enviado', 'Entregado', 'Cancelado', 'Devuelto'], {
    required_error: 'Status is required',
    invalid_type_error: 'Invalid status'
  }),

  endDate: z.string().date().optional(),

  orderID: z.string({
    required_error: 'Order ID is required',
    invalid_type_error: 'Order ID must be a string'
  }).uuid()
});

export function validateOrderHistory(input) {
  return orderHistorySchema.safeParse(input);
}

export function validatePartialOrderHistory(input) {
  return orderHistorySchema.partial().safeParse(input);
}
