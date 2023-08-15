'use client';

import * as z from 'zod';

export const videoSchema = z.object({
  prompt: z.string().nonempty(),
});
