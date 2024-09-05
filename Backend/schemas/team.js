import { z } from 'zod';

const teamSchema = z.object({
  name: z.string({
    required_error: 'Team name is required',
    invalid_type_error: 'Team name must be a string'
  })
});

export function validateTeam(input) {
  return teamSchema.safeParse(input);
}

export function validatePartialTeam(input) {
  return teamSchema.partial().safeParse(input);
}
