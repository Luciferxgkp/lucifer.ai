'use client';

import * as z from 'zod';

export const audioSchema = z.object({
  prompt: z.string().nonempty(),
});
