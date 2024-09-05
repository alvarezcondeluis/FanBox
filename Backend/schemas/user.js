import { z } from 'zod';

const userSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First name must be a string'
  }),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{9}$/, 'Phone must be a 9-digit number'),
  passwd: z.string().min(8, 'Password must be at least 8 characters long'),
  dateOfBirth: z.string().refine(date => !isNaN(Date.parse(date)), {  // No existe funcion para comprobar si es una fecha válida
    message: 'Release date must be a valid date'
  }),
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
