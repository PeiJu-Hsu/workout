import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../firebase";
interface MenuList {
  itemName: string;
  loading: number;
  runCount: number;
  records: number[];
}
interface MenuStore {
  itemGroup: string;
  itemGroupIndex: number;
  itemName: string;
  loading: string | number;
  runCount: string | number;
  menuList: MenuList[];
  menuPublic: boolean;
  setItemGroup: (value: string) => void;
  setItemGroupIndex: (value: number) => void;
  setItemName: (value: string) => void;
  setLoading: (value: number) => void;
  setRunCount: (value: number) => void;
  setMenuList: () => void;
  resetMenuList: (
    value: {
      itemName: string;
      loading: number;
      runCount: number;
      records: number[];
    }[]
  ) => void;
  setMenuPublic: () => void;
  addMenuRecord: () => Promise<void>;
}
const menuListString = localStorage.getItem("menuList")
  ? localStorage.getItem("menuList")
  : [];
export const MenuStore = create<MenuStore>()((set, get) => ({
  itemGroup: "default",
  itemGroupIndex: 0,
  itemName: "default",
  loading: "default",
  runCount: "default",
  // menuList: JSON.parse(menuListString),
  menuList: [],
  menuPublic: true,
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
    console.log("1st", get().menuList);
    set((state) => ({
      menuList: [
        ...state.menuList,
        {
          itemName: get().itemName,
          loading: Number(get().loading),
          runCount: Number(get().runCount),
          records: new Array(Number(get().runCount)).fill(
            Number(get().loading)
          ),
        },
      ],
    }));
    localStorage.setItem("menuList", JSON.stringify(get().menuList));
    console.log("2nd", get().menuList);
  },
  resetMenuList: (value) => {
    set({ menuList: value });
    localStorage.setItem("menuList", JSON.stringify(get().menuList));
  },
  setMenuPublic: () => {
    set((state) => ({ menuPublic: !state.menuPublic }));
  },

  addMenuRecord: async () => {
    console.log(auth.currentUser);
    if (auth.currentUser) {
      const CurrentUserId = auth.currentUser.uid;
      const docMenuRecordsCol = collection(
        db,
        "users",
        CurrentUserId,
        "menuRecords"
      );
      const newDocRef = doc(docMenuRecordsCol);
      const { id } = newDocRef;
      const MenuRecord = {
        content: get().menuList,
        isPublic: get().menuPublic,
      };
      await setDoc(
        newDocRef,
        { ...MenuRecord, id, trainingTime: serverTimestamp() },
        { merge: true }
      );
      console.log("addMenuRecord ok");
    }
  },
}));
