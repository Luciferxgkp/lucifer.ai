'use client';

import * as z from 'zod';

export const conversationSchema = z.object({
  prompt: z.string().nonempty(),
});
