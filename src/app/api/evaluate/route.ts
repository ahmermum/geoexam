// src/app/api/evaluate/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    // Log the prompt on the server side
    console.log('Prompt received by the server:', prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const evaluation = completion.choices[0]?.message?.content?.trim() ?? '';

    return NextResponse.json({ evaluation });
  } catch (error: any) {
    console.error('Error in OpenAI API call:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

