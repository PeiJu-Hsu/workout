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
  date?: number | undefined;
}

interface RecordStore {
  itemGroup: string;
  itemGroupIndex: number;
  itemName: string;
  itemRecords: DocumentData[];
  itemMaxRecord: maxValue;
  itemHistory: { date: string; weight: number }[];
  setItemGroup: (value: string) => void;
  setItemGroupIndex: (value: string) => void;
  setItemName: (value: string) => void;
  fetchRecordData: () => Promise<DocumentData[] | undefined>;
  getItemSummary: () => void;
  getItemMaxRecords: () => void;
  getItemHistory: () => void;
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
    itemMaxRecord: {},
    itemHistory: [],
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
      return records;
    },
    getItemSummary: () => {
      const itemRecords = get().itemRecords;
      console.log("itemRecords", itemRecords);
      const itemName = get().itemName;
      //[{}, ..., {date: "2021/10/10", summary: {item1: 35, item2: 20}}, ...]
      const maxRecords = itemRecords.map((item) => ({
        summary: item.MaxSummary,
        date: item.formatTime,
        ...item[itemName],
      }));
      console.log("maxRecords", maxRecords);
      return maxRecords;
    },
    getItemMaxRecords: () => {
      const itemRecords = get().itemRecords;
      console.log("itemRecords", itemRecords);
      const itemName = get().itemName;
      //[{}, ..., {date: "2021/10/10", summary: {item1: 35, item2: 20}}, ...]
      const maxRecords = itemRecords.map((item) => ({
        summary: item.MaxSummary,
        date: item.formatTime,
        ...item[itemName],
      }));
      console.log("maxRecords", maxRecords);
      const maxValue: maxValue = {};

      maxRecords.forEach((record) => {
        //把選好的目標item放進來當index
        const maxRecordValue = record.summary[itemName];
        //如果maxRecordValue有值，就跟maxValue[itemName]比較，如果maxValue[itemName]沒有值，就直接把maxRecordValue放進去
        if (maxRecordValue !== undefined) {
          const existingMaxValue = maxValue[itemName];
          const existingMaxDate = record.date;
          if (
            existingMaxValue === undefined ||
            maxRecordValue > existingMaxValue
          ) {
            maxValue[itemName] = maxRecordValue;
            maxValue.date = existingMaxDate;
          }
        }
      });
      console.log("maxValue", maxValue);
      console.log(
        `${itemName} 的最大值: ${maxValue[itemName]} 日期: ${maxValue.date}`,
      );
      set({
        itemMaxRecord: maxValue,
      });
      console.log("itemMaxRecord", get().itemMaxRecord);
    },
    getItemHistory: () => {
      const itemRecords = get().itemRecords;
      const itemName = get().itemName;
      //[{}, ..., {date: "2021/10/10", summary: {item1: 35, item2: 20}}, ...]
      const maxRecords = itemRecords.map((item) => ({
        summary: item.MaxSummary,
        date: item.formatTime,
        ...item[itemName],
      }));
      const results = [];
      for (const record of maxRecords) {
        const date = record.date;
        const summary = record.summary;

        if (summary && summary[itemName] !== undefined) {
          results.push({ date, weight: summary[itemName] });
        }
      }
      set({ itemHistory: results });
      console.log("itemHistory", get().itemHistory);
    },
  })),
);
