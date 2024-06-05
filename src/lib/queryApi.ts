import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const query = async (prompt: string, model: string) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-2024-05-13",
    messages: [
      {
        role: "user",
        content: `Return respone in a markdown format. ${prompt}`,
      },
    ],
    temperature: 1,
    max_tokens: 4096,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true, // Enable streaming
  });

  return res;
};

export default query;
