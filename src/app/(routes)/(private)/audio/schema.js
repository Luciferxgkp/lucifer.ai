'use client';

import * as z from 'zod';

export const audioSchema = z.object({
  prompt: z.string().min(1, { message: 'Please provide a prompt' }),
});
