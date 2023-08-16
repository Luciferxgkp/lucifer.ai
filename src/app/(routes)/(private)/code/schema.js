'use client';

import * as z from 'zod';

export const codeSchema = z.object({
  prompt: z.string().min(1, { message: 'Please enter a prompt' }),
});
