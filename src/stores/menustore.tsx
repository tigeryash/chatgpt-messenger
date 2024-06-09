import { create } from "zustand";

type MenuStore = {
  click: boolean;
  toggleClick: () => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
  click: true,
  toggleClick: () => set((state) => ({ click: !state.click })),
}));
