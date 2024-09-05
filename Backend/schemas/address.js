import { z } from 'zod';

const addressSchema = z.object({
  
  street: z.string({
    required_error: 'Street is required',
    invalid_type_error: 'Street must be a string'
  }),
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City must be a string'
  }),
  province: z.string().optional(),
  postalCode: z.string({  
    required_error: 'Postal code is required',
    invalid_type_error: 'Postal code must be a string'
  }).regex(/^[0-9]{5}$/, 'Postal code must be a 5-digit number'), 
  
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country must be a string'
  }), 
  number: z.string({
    required_error: 'Number is required',
    invalid_type_error: 'Number must be a string'
  }).regex(/^[0-9]{1,3}$/, 'Incorrect number format'),
  instructions: z.string().optional(),
   
});

export function validateAddress(input) {
  return addressSchema.safeParse(input);
}

export function validatePartialAddress(input) {
  return addressSchema.partial().safeParse(input);
}
