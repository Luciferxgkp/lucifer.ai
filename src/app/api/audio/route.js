import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATEAI_API_TOKEN,
});
export const POST = async (req) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse('UNAUTHORIZED', { status: 401 });
    }
    if (!replicate.auth) {
      return new NextResponse('REPLICATE_API_KEY_NOT_FOUND', { status: 500 });
    }
    if (!prompt) {
      return new NextResponse('PROMPT_NOT_FOUND', { status: 400 });
    }
    const response = await replicate.run(
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt,
        },
      }
    );
    // const response = await replicate.run(
    //   'facebookresearch/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906',
    //   {
    //     input: {
    //       model_version: 'melody',
    //       prompt: prompt,
    //     },
    //   }
    // );

    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse('AUDIO_INTERNAL_ERROR ' + error.message, {
      status: 500,
    });
  }
};
