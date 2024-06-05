import query from "@/lib/queryApi";
import { adminDb } from "../../../../firebaseAdmin";
import admin from "firebase-admin";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, chatId, model, session } = await req.json();

  if (!prompt || !chatId || !session?.user?.email) {
    return new Response("Bad request", { status: 400 });
  }

  const userEmail = session?.user?.email;
  const useDocRef = adminDb.collection("users").doc(userEmail);
  const userDoc = await useDocRef.get();

  if (!userDoc.exists) {
    await useDocRef.set({
      email: userEmail,
      createdAt: admin.firestore.Timestamp.now(),
    });
  }

  try {
    const responseStream = await query(prompt, model);

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let fullText = ""; // Initialize a variable to accumulate text chunks
        for await (const chunk of responseStream) {
          const textChunk = chunk.choices[0].delta?.content || "";
          fullText += textChunk; // Append new chunk to the full text

          // Update the existing message in Firestore
          const messageRef = adminDb
            .collection("users")
            .doc(userEmail)
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .doc("ongoingResponse"); // Use a fixed document ID for ongoing responses

          await messageRef.set(
            {
              text: fullText,
              createdAt: admin.firestore.Timestamp.now(),
              user: {
                _id: "ChatGPT",
                name: "ChatGPT",
                avatar: "https://ui-avatars.com/api/?name=ChatGPT",
              },
            },
            { merge: true }
          ); // Use merge option to update the document
        }
        controller.close();
        const completeMessageRef = adminDb
          .collection("users")
          .doc(userEmail)
          .collection("chats")
          .doc(chatId)
          .collection("messages")
          .doc(); // Create a new document for the complete message

        await completeMessageRef.set({
          text: fullText,
          createdAt: admin.firestore.Timestamp.now(),
          user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: "https://ui-avatars.com/api/?name=ChatGPT",
          },
        });

        // Delete the ongoing message document
        await adminDb
          .collection("users")
          .doc(userEmail)
          .collection("chats")
          .doc(chatId)
          .collection("messages")
          .doc("ongoingResponse")
          .delete();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain" },
      status: 200,
    });
  } catch (err: any) {
    return new Response(
      `ChatGPT was unable to find an answer for that! Error: ${err.message}`,
      { status: 500 }
    );
  }
}
