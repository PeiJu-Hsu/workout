import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { db } from "../firebase";

interface RecordStore {
  itemGroup: string;
  itemGroupIndex: number;
  itemName: string;
  itemRecords: DocumentData[];
  itemMaxRecord: number;
  setItemGroup: (value: string) => void;
  setItemGroupIndex: (value: number) => void;
  setItemName: (value: string) => void;
  fetchRecordData: () => Promise<DocumentData[] | undefined>;
  getItemMaxRecords: () => void;
}
interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}
const getformatTime = (timestamp: TimeStamp) => {
  const newTime = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const date = newTime.toLocaleDateString();
  const newTimeString = date;

  return newTimeString;
};
export const RecordStore = create<RecordStore>()(
  immer((set, get) => ({
    itemGroup: "default",
    itemGroupIndex: 0,
    itemName: "default",
    itemRecords: [],
    itemMaxRecord: 0,
    setItemGroup: (value) => {
      set({ itemGroup: value });
    },
    setItemGroupIndex: (value) => {
      set({ itemGroupIndex: Number(value) });
    },
    setItemName: (value) => {
      set({ itemName: value });
    },
    fetchRecordData: async () => {
      const UID = localStorage.getItem("UID");
      const docRecordCol = collection(db, "users", UID, "menuRecords");
      const orderedQuery = query(docRecordCol, orderBy("trainingTime", "desc"));
      const recordSnap = await getDocs(orderedQuery);
      if (!recordSnap) return;
      const records = recordSnap.docs.map((doc) => doc.data());
      records.map((obj) => {
        obj.formatTime = getformatTime(obj.trainingTime);
      });
      set({ itemRecords: records });
      console.log("records", records);
      return records;
    },
    getItemMaxRecords: () => {
      const itemRecords = get().itemRecords;
      const itemName = get().itemName;
      //recordsContent = [Array(1), Array(2), Array(1), Array(2)], 裡面一個array 是一次運動紀錄
      const recordsContent = itemRecords.map((item) => item.content);
      //targetRecords = [Array(3), Array(2), Array(3)], array內是每次 itemName的重量紀錄
      const targetRecords = recordsContent
        .flatMap((arr) => arr.filter((item) => item.itemName === itemName))
        .map((item) => item.records);
      const maxRecordsValue = Math.max(...targetRecords.flat());
      console.log(Boolean(maxRecordsValue));
      console.log(`maxRecordsValue of ${itemName}`, maxRecordsValue);

      set({
        itemMaxRecord: maxRecordsValue === -Infinity ? 0 : maxRecordsValue,
      });

      return maxRecordsValue;
    },
  }))
);
