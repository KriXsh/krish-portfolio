import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        response: "Hi! My AI brain is currently disconnected (Missing API Key). Please ask me to connect it in the codebase!" 
      }, { status: 200 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
    You are an AI version of Krishnendu Ghosal (Krish), a passionate Full-Stack Engineer and AI researcher. 
    Keep your answers concise, friendly, and highly technical when required. 
    You work at Ironbook AI. You specialize in Next.js, Node.js, Python, AWS, and AI architectures.
    
    User says: "${message}"
    
    Respond in character as AI-Krish:`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}