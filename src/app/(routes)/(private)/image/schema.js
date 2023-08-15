'use client';

import * as z from 'zod';

export const imageSchema = z.object({
  prompt: z.string().nonempty(),
  size: z.string().nonempty(),
  count: z.string().nonempty(),
});

export const resolutionOptions = ['256x256', '512x512', '1024x1024'];

export const amountOptions = ['1', '2', '3', '4', '5'];
