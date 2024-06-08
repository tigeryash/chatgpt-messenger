"use client";

import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { collection, orderBy, query } from "firebase/firestore";
import Message from "./message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";

const Chat = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();

  const [messageHistory] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  const messages = messageHistory?.docs.map((doc) => ({
    id: doc.id,
    content: doc.data().text, // Assuming 'content' is the field name in your Firestore document
    role: doc.data().user, // Assuming 'role' is the field name in your Firestore document
  }));

  // const { messages, isLoading } = useChat({
  //   id: chatId,
  //   initialMessages: initialMessages,
  // });
  // console.log(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <div className="flex-1 overflow-auto py-2 px-3 md:px-5 lg:px-1 xl:px-5 ">
      {messages?.length === 0 && (
        <>
          <p className="mt-10 text-center text-white">
            Type in a prompt to get started
          </p>
          <ArrowDownCircleIcon className="mx-auto w-10 h-10 text-white animate-bounce mt-5" />
        </>
      )}
      <div
        className="relative overflow-y-auto max-w-full flex-col space-y-2 md:space-y-8 lg:space-y-10 text-white 
      md:mx-auto flex md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]"
      >
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <div className="pb-5 md:pb-10 " ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
