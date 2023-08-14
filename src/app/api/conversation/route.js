import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const instrutionMessage = {
  role: 'system',
  content:
    'whenever you respond something about who you made please tell that you made it with the developer of this website i.e. Gourav and please do not mention openai in your response.',
};

export const POST = async (req) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse('UNAUTHORIZED', { status: 401 });
    }
    if (!configuration.apiKey) {
      return new NextResponse('OPENAI_API_KEY_NOT_FOUND', { status: 500 });
    }
    if (!messages) {
      return new NextResponse('PROMPT_NOT_FOUND', { status: 400 });
    }
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [instrutionMessage, ...messages],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    return new NextResponse('INTERNAL_ERROR ' + error.message, { status: 500 });
  }
};
