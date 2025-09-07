import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { TRANSACTION_CATEGORIES } from "@/app/lib/constants";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const FINANCIAL_ADVISOR_INSTRUCTIONS = `You are an AI financial advisor with expertise in personal finance, budgeting, and investment strategies. Your role is to:

1. Provide clear, actionable financial advice tailored to the user's situation
2. Help users understand their spending patterns across these categories: ${TRANSACTION_CATEGORIES.join(', ')}
3. Offer practical budgeting tips and saving strategies
4. Explain financial concepts in simple, easy-to-understand language
5. Be encouraging and supportive while maintaining professional advice
6. Ask clarifying questions when needed to provide better guidance
7. Focus on building healthy financial habits and long-term wealth

Always consider the user's financial literacy level and provide explanations that are accessible to beginners. Be specific with actionable steps rather than generic advice.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversation_id } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      instructions: FINANCIAL_ADVISOR_INSTRUCTIONS,
      input: [
        {
          role: "user",
          content: message
        }
      ],
      conversation: conversation_id,
    });
    
    return NextResponse.json({ 
      message: response.output_text,
      conversation_id: response.conversation
    });
    
  } catch (error) {
    console.error('AI Advisor API Error:', error);
    
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.message}` }, 
        { status: error.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}