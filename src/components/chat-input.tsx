"use client";
import { useChat } from "ai/react";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { useCollection } from "react-firebase-hooks/firestore";
import useChatStore from "@/stores/chatstore";

const ChatInput = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const setMessagestore = useChatStore((state) => state.setMessagestore);

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

  const initialMessages = messageHistory?.docs.map((doc) => ({
    id: doc.id,
    content: doc.data().text, // Assuming 'content' is the field name in your Firestore document
    role: doc.data().user.name, // Assuming 'role' is the field name in your Firestore document
  }));

  const { isLoading, handleSubmit, input, handleInputChange, messages } =
    useChat({
      initialMessages: initialMessages,
      onFinish: async (message) => {
        // Add the message to Firebase
        const userEmail = session?.user?.email!;
        const messageRef = collection(
          db,
          "users",
          userEmail,
          "chats",
          chatId,
          "messages"
        );

        await addDoc(messageRef, {
          text: message.content,
          createdAt: new Date(),
          user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: "https://ui-avatars.com/api/?name=ChatGPT",
          },
        });
      },
      api: "/api/askQuestion",
      id: chatId,
      onResponse: (response) => {
        console.log(response);
      },
      onError: (error) => {
        console.log(error, "this is the error");
        console.log(messages);
      },
    });

  setMessagestore(messages.filter((msg) => msg.role !== "user"));
  console.log(messages);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!e.shiftKey) {
        formRef.current?.requestSubmit();
      }
    }
  };

  const saveUserMessageToFirebase = async (text: string) => {
    const userEmail = session?.user?.email!;
    const messageRef = collection(
      db,
      "users",
      userEmail,
      "chats",
      chatId,
      "messages"
    );

    await addDoc(messageRef, {
      text,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    await saveUserMessageToFirebase(input.trim());
    handleSubmit(e);
  };

  return (
    <div className=" text-gray-400 text-sm w-full flex justify-center">
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="relative bg-[#2f2f2f] mx-2 flex flex-row gap-3 lg:mx-auto lg:max-w-2xl xl:max-w-3xl overflow-hidden flex-grow rounded-full"
      >
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Message ChatGPT..."
          style={{ overflowY: "hidden" }}
          className="m-0 w-full flex justify-center items-center outline-none resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 
         pr-10 md:py-3.5 md:pr-12 max-h-[44px] 
           placeholder-black/50  pl-4 dark:placeholder-white/50 dark:placeholder-opacity-50
          py-[10px] md:max-h-[52px] md:pl-6  md:text-lg"
        />

        <button
          type="submit"
          disabled={!input || !session || isLoading}
          className="absolute bottom-[20.2%] right-[2%] sm:right-[1%]  rounded-full border border-black bg-black p-1
           text-black transition-colors enabled:bg-white disabled:text-gray-400 disabled:bg-[#676767]
             md:bottom-[18%] md:right-3"
        >
          <ArrowUpIcon className="w-4 h-4 md:h-6 md:w-6 " />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
