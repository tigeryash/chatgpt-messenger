import { create } from "zustand";

type Message = {
  role:
    | "user"
    | "function"
    | "system"
    | "assistant"
    | "data"
    | "tool"
    | "ChatGPT";
  content: string;
  id: string;
};

type ChatStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
  setMessagestore: (messages: Message[]) => void;
};

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessagestore: (messages) => set({ messages }),
}));

export default useChatStore;
