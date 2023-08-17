'use client';

import * as z from 'zod';

export const imageSchema = z.object({
  prompt: z.string().min(1, { message: 'Please enter a prompt.' }),
  size: z.string().min(1, { message: 'Please select a resolution.' }),
  count: z.string().min(1, { message: 'Please select an amount.' }),
});

export const resolutionOptions = [
  // '256x256',
  '384x384',
  '512x512',
  // '576x576',
  // '640x640',
  // '704x704',
  // '768x768',
  // '960x960',
  '1024x1024',
  // '1152x1152',
  // '1280x1280',
  // '1536x1536',
  // '1792x1792',
  // '2048x2048',
];

export const amountOptions = ['1', '2', '3', '4'];
