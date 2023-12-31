import {
    DocumentData,
    collection,
    getDocs,
    orderBy,
    query,
} from 'firebase/firestore';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { db } from '../firebase';
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
    setItemGroup: (value: string | undefined) => void;
    setItemGroupIndex: (value: number) => void;
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
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const date = newTime.toLocaleDateString();
    const newTimeString = date;

    return newTimeString;
};
export const RecordStore = create<RecordStore>()(
    immer((set, get) => ({
        itemGroup: 'default',
        itemGroupIndex: 0,
        itemName: 'default',
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
            const UID = localStorage.getItem('UID');
            const docRecordCol = collection(db, 'users', UID!, 'menuRecords');
            const orderedQuery = query(
                docRecordCol,
                orderBy('trainingTime', 'desc')
            );
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
            const itemName = get().itemName;
            const maxRecords = itemRecords.map((item) => ({
                summary: item.MaxSummary,
                date: item.formatTime,
                ...item[itemName],
            }));
            return maxRecords;
        },
        getItemMaxRecords: () => {
            const itemRecords = get().itemRecords;
            const itemName = get().itemName;
            const maxRecords = itemRecords.map((item) => ({
                summary: item.MaxSummary,
                date: item.formatTime,
                ...item[itemName],
            }));
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
            set({
                itemMaxRecord: maxValue,
            });
        },
        getItemHistory: () => {
            const itemRecords = get().itemRecords;
            const itemName = get().itemName;
            const maxRecords = itemRecords.map((item) => ({
                summary: item.MaxSummary,
                date: item.formatTime,
                ...item[itemName],
            }));
            if (itemName === 'default') return;
            const results = [];
            for (const record of maxRecords) {
                const date = record.date;
                const summary = record.summary;

                if (summary && summary[itemName] !== undefined) {
                    results.push({ date, weight: summary[itemName] });
                }
            }
            set({ itemHistory: results });
        },
    }))
);
