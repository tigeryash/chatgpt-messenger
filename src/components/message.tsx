import { DocumentData } from "firebase/firestore";
import React from "react";
import chagptImg from "../../public/chatgpt-6.svg";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import HeadingWithCopy from "./heading-with-copy";

const Message = ({ message }: { message: DocumentData }) => {
  const isChatGPT = message.user.name === "ChatGPT";
  return (
    <>
      {isChatGPT ? (
        <div className="flex w-full items-start gap-3">
          <div className="border-[1px] border-white/50 p-1 flex justify-center items-center rounded-full text-white">
            <Image
              src={chagptImg}
              alt=""
              className="h-3 w-3 md:h-6 md:w-6 text-white"
            />
          </div>

          <div className="flex items-center justify-left flex-1 relative min-h-[20px]">
            <div
              className=" text-pretty text-sm md:text-base text-left markdown whitespace-pre-wrap 
            "
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="ml-auto max-w-[212px] sm:max-w-[350px] md:max-w-[70%] min-h-[20px] 
        rounded-3xl text-sm md:text-base bg-[#2f2f2f] py-2.5 px-5 break-words whitespace-pre-wrap overflow-x-auto"
        >
          {message.text}
        </div>
      )}
    </>
  );
};

export default Message;
