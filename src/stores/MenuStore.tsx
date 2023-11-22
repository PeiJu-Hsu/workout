import { create } from "zustand";
interface MenuStore {
  itemGroup: string;
  itemGroupIndex: number;
  itemName: string;
  loading: string | number;
  runCount: string | number;
  menuList: { itemName: string; loading: number; runCount: number }[];
  setItemGroup: (value: string) => void;
  setItemGroupIndex: (value: number) => void;
  setItemName: (value: string) => void;
  setLoading: (value: number) => void;
  setRunCount: (value: number) => void;
  setMenuList: () => void;
  resetMenuList: (
    value: { itemName: string; loading: number; runCount: number }[]
  ) => void;
}
export const MenuStore = create<MenuStore>()((set, get) => ({
  itemGroup: "default",
  itemGroupIndex: 0,
  itemName: "default",
  loading: "default",
  runCount: "default",
  menuList: [],
  setItemGroup: (value) => {
    set({ itemGroup: value });
  },
  setItemGroupIndex: (value) => {
    set({ itemGroupIndex: Number(value) });
  },
  setItemName: (value) => {
    set({ itemName: value });
  },
  setLoading: (value) => {
    set({ loading: value });
  },
  setRunCount: (value) => {
    set({ runCount: value });
  },
  setMenuList: () => {
    set((state) => ({
      menuList: [
        ...state.menuList,
        {
          itemName: get().itemName,
          loading: Number(get().loading),
          runCount: Number(get().runCount),
        },
      ],
    }));
  },
  resetMenuList: (value) => {
    set({ menuList: value });
  },
}));
