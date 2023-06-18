import { Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  const message = await req.json();
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      stream: false,
      temperature: 0.6,
      messages: [
        {
          role: 'user',
          content: message.content,
        },
      ],
    });

    return NextResponse.json({
      message: completion.data.choices[0].message,
      success: true,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ message: error, success: false });
  }
}
