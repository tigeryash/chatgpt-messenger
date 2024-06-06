"use client";
import NewChat from "./new-chat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { signOut, useSession } from "next-auth/react";
import ChatRow from "./chat-row";
import { useMediaQuery } from "react-responsive";
import { useMenuStore } from "@/stores/menustore";
import MenuToggle from "./menu-toggle";
import Image from "next/image";

const SideBar = () => {
  const { data: session, status } = useSession();
  const click = useMenuStore((state) => state.click);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <aside
      className={`relative flex flex-col flex-1 h-full ${
        isMobile ? "w-full" : "w-[260px]"
      }`}
    >
      <div
        className={` ${
          isMobile ? "w-full" : "w-[260px]"
        } bg-[#171717] flex justify-between  py-4 px-5`}
      >
        <MenuToggle />
        <NewChat session={session} />
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <div className="flex flex-col space-y-2  ">
          {loading && (
            <div className="animate-pulse text-center text-white">
              <p>Loading chats...</p>
            </div>
          )}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>

      {session && (
        <div
          className={` ${
            isMobile ? "w-full" : "w-[260px]"
          } bg-[#171717] flex p-2 justify-center items-center`}
        >
          <Image
            onClick={() => signOut()}
            src={session.user?.image!}
            alt="Profile pic"
            height={140}
            width={140}
            className=" h-12 w-12 rounded-full cursor-pointer hover:opacity-50"
          />
        </div>
      )}
    </aside>
  );
};

export default SideBar;
