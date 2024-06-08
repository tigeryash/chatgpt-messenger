import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("yooooo");

  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
  });
  return result.toAIStreamResponse();
}
