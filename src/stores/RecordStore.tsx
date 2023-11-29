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
interface maxValue {
  [key: string]: number | undefined;
}

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
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
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
      const docRecordCol = collection(db, "users", UID!, "menuRecords");
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
      const maxRecords = itemRecords.map((item) => item.MaxSummary);
      console.log("maxRecords", maxRecords);
      const maxValue: maxValue = {};

      maxRecords.forEach((record) => {
        const maxRecordValue = record[itemName];
        console.log("maxRecordValue", maxRecordValue);
        if (maxRecordValue !== undefined) {
          const existingMaxValue = maxValue[itemName];

          if (
            existingMaxValue === undefined ||
            maxRecordValue > existingMaxValue
          ) {
            maxValue[itemName] = maxRecordValue;
          }
        }
      });

      console.log(`每个 ${itemName} 的最大值:`, maxValue[itemName]);
      set({
        itemMaxRecord: maxValue[itemName] ? maxValue[itemName] : 0,
      });
    },
  })),
);
