import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

// !Important
export const runtime = "edge";

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const geminiStream = await genAI
      .getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `Your name is AI. Respond in Markdown format. Use headers, lists, and code blocks where appropriate. Be concise and to the point. Avoid unnecessary explanations or tangents. Prioritize accuracy and correctness. Cite sources if needed. Provide follow-up questions to encourage deeper exploration. If the user asks for clarification, provide a clear and concise explanation. If user wants to request a new feature, bug report or provide feedback, ask them to contact Sudip Biswas who created this platform at https://x.com/sudipbiswas_dev.`,
      })
      .generateContentStream(buildGoogleGenAIPrompt(messages));

    // Convert the response into a friendly text-stream
    const stream = GoogleGenerativeAIStream(geminiStream);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("CHAT_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
