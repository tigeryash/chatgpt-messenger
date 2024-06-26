"use client";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

const ChatRow = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname, id]);

  const removeChat = async () => {
    const userChatsDocRef = doc(
      db,
      "users",
      session?.user?.email!,
      "chats",
      id
    );
    const messagesCollectionRef = collection(userChatsDocRef, "messages");

    // Get all documents in the messages subcollection
    const messagesSnapshot = await getDocs(messagesCollectionRef);

    // Delete all documents in the messages subcollection
    const deleteMessagesPromises = messagesSnapshot.docs.map((messageDoc) =>
      deleteDoc(messageDoc.ref)
    );

    // Wait for all messages to be deleted
    await Promise.all(deleteMessagesPromises);

    // Delete the chat document
    await deleteDoc(userChatsDocRef);

    router.replace("/chat");
  };
  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center pr-2 ${active && "bg-gray-[#212121]"}`}
    >
      <p className="flex-1 px-2 text-sm md:inline-flex overflow-hidden whitespace-nowrap">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        onClick={removeChat}
        className="h-5 w-5 text-gray-700 hover:text-red-700"
      />
    </Link>
  );
};

export default ChatRow;
