import Chat from "@/components/chat";
import ChatInput from "@/components/chat-input";

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = ({ params: { id } }: Props) => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Chat chatId={id} />

      <ChatInput chatId={id} />
    </div>
  );
};

export default ChatPage;
