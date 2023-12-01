import {
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../firebase";
interface maxValue {
  [key: string]: number | undefined;
}
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
  targetStudent: string;
  menuList: MenuList[] | [];
  menuPublic: boolean;
  setItemGroup: (value: string) => void;
  setItemGroupIndex: (value: number) => void;
  setItemName: (value: string) => void;
  setLoading: (value: number) => void;
  setRunCount: (value: number) => void;
  setTargetStudent: (value: string) => void;
  setMenuList: () => void;
  resetMenuList: (
    value: {
      itemName: string;
      loading: number;
      runCount: number;
      records: number[];
    }[],
  ) => void;
  setMenuPublic: () => void;
  addMenuRecord: () => Promise<void>;
  clearMenuList: () => void;
  sentToStudent: (currentUserName: string) => Promise<void>;
  deleteReceivedMenu: (id: string) => Promise<void>;
}

const menuListString = localStorage.getItem("menuList")
  ? JSON.parse(localStorage.getItem("menuList")!)
  : [];
export const MenuStore = create<MenuStore>()((set, get) => ({
  itemGroup: "default",
  itemGroupIndex: 0,
  itemName: "default",
  loading: "default",
  runCount: "default",
  targetStudent: "default",
  menuList: menuListString,
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
  setTargetStudent: (value) => {
    set({ targetStudent: value });
  },
  setMenuList: () => {
    set((state) => ({
      menuList: [
        ...state.menuList,
        {
          itemName: get().itemName,
          loading: Number(get().loading),
          runCount: Number(get().runCount),
          records: new Array(Number(get().runCount)).fill(
            Number(get().loading),
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
    if (auth.currentUser) {
      const CurrentUserId = auth.currentUser.uid;
      const docMenuRecordsCol = collection(
        db,
        "users",
        CurrentUserId,
        "menuRecords",
      );
      const newDocRef = doc(docMenuRecordsCol);
      const { id } = newDocRef;
      const maxValue: maxValue = {};
      get().menuList.forEach((item) => {
        const { itemName, records } = item;
        const maxRecord = Math.max(...records);

        if (!maxValue[itemName] || maxRecord > maxValue[itemName]!) {
          maxValue[itemName] = maxRecord;
        }
      });
      const MenuRecord = {
        content: get().menuList,
        isPublic: get().menuPublic,
        MaxSummary: maxValue,
      };
      await setDoc(
        newDocRef,
        { ...MenuRecord, id, trainingTime: serverTimestamp() },
        { merge: true },
      );
      localStorage.removeItem("menuList");
      get().resetMenuList([]);
    }
  },
  clearMenuList: () => {
    localStorage.removeItem("menuList");
    get().resetMenuList([]);
  },
  sentToStudent: async (currentUserName) => {
    if (get().targetStudent === "default" || !get().menuList) {
      alert("請選擇學員或是新增訓練項目");
      return;
    }

    const docMenuRecordsCol = collection(
      db,
      "users",
      get().targetStudent,
      "receivedMenu",
    );
    const newDocRef = doc(docMenuRecordsCol);
    const { id } = newDocRef;
    const newMenu = {
      content: get().menuList,
      isPublic: get().menuPublic,
      senderName: currentUserName,
    };
    await setDoc(
      newDocRef,
      { ...newMenu, id, sendTime: serverTimestamp() },
      { merge: true },
    );
    alert("已傳送");
  },
  deleteReceivedMenu: async (id) => {
    const docMenuRecordsCol = collection(
      db,
      "users",
      auth.currentUser?.uid ?? "",
      "receivedMenu",
    );
    const docRef = doc(docMenuRecordsCol, id);
    await deleteDoc(docRef);
  },
}));
