import {
  DocumentData,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { auth, db } from "../firebase";
interface InBodyStore {
  measureTime: Date;
  inBodyScore: number;
  height: number;
  weight: number;
  bodyWater: number;
  bodyFat: number;
  bodyProtein: number;
  bodyMineral: number;
  bodyMuscle: number;
  controlWeight: number;
  controlFat: number;
  controlMuscle: number;
  fatRatio: number;
  bmi: number;
  InBodyHistory: DocumentData;
  calculateBMI: () => string;
  calculateFatRatio: () => string;
  fetchInBodyData: () => Promise<DocumentData[] | undefined>;
  setInBodyStatus: (inBodyData: DocumentData) => void;
  addInBodyData: () => Promise<void>;
  setInputNumberToState: (targetState: string, value: number | Date) => void;
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
export const InBodyStore = create<InBodyStore>()(
  immer((set, get) => ({
    measureTime: new Date(),
    inBodyScore: 0,
    height: 0,
    weight: 0,
    bodyWater: 0,
    bodyFat: 0,
    bodyProtein: 0,
    bodyMineral: 0,
    bodyMuscle: 0,
    controlWeight: 0,
    controlFat: 0,
    controlMuscle: 0,
    fatRatio: 0,
    bmi: 0,
    InBodyHistory: [],
    calculateBMI: () => {
      const BMI = (
        (get().weight * 10000) /
        get().height /
        get().height
      ).toFixed(2);
      set({ bmi: Number(BMI) });
      return BMI;
    },
    calculateFatRatio: () => {
      const fatRatio = ((100 * get().bodyFat) / get().weight).toFixed(2);
      set({ fatRatio: Number(fatRatio) });
      return fatRatio;
    },

    fetchInBodyData: async () => {
      const UID = localStorage.getItem("UID");
      if (UID) {
        const CurrentUserId = UID;
        const docInBodyCol = collection(db, "users", CurrentUserId, "inBody");
        const orderedQuery = query(
          docInBodyCol,
          orderBy("measureTime", "desc")
        );
        const docInBodySnap = await getDocs(orderedQuery);
        const inBodyData = docInBodySnap.docs.map((doc) => doc.data());
        inBodyData.map((obj) => {
          obj.formatTime = getformatTime(obj.measureTime);
        });
        get().setInBodyStatus(inBodyData);

        return inBodyData;
      }
    },
    setInBodyStatus: (inBodyData) => {
      set({ measureTime: inBodyData[0].measureTime });
      set({ inBodyScore: inBodyData[0].inBodyScore });
      set({ height: inBodyData[0].height });
      set({ weight: inBodyData[0].weight });
      set({ bodyWater: inBodyData[0].bodyWater });
      set({ bodyFat: inBodyData[0].bodyFat });
      set({ bodyMineral: inBodyData[0].bodyMineral });
      set({ bodyMuscle: inBodyData[0].bodyMuscle });
      set({ bmi: inBodyData[0].bmi });
      set({ controlWeight: inBodyData[0].controlWeight });
      set({ controlFat: inBodyData[0].controlFat });
      set({ controlMuscle: inBodyData[0].controlMuscle });
      set({ fatRatio: inBodyData[0].fatRatio });
      set({ InBodyHistory: inBodyData });
    },

    addInBodyData: async () => {
      if (auth.currentUser) {
        get().calculateBMI();
        get().calculateFatRatio();
        const CurrentUserId = auth.currentUser.uid;
        const docInBodyCol = collection(db, "users", CurrentUserId, "inBody");
        const newDocRef = doc(docInBodyCol);
        const { id } = newDocRef;
        const inBodyData = {
          measureTime: get().measureTime,
          inBodyScore: get().inBodyScore,
          height: get().height,
          weight: get().weight,
          bodyWater: get().bodyWater,
          bodyFat: get().bodyFat,
          bodyProtein: get().bodyProtein,
          bodyMineral: get().bodyMineral,
          bodyMuscle: get().bodyMuscle,
          controlWeight: get().controlWeight,
          controlFat: get().controlFat,
          controlMuscle: get().controlMuscle,
          fatRatio: get().fatRatio,
          bmi: get().fatRatio,
        };
        await setDoc(newDocRef, { ...inBodyData, id }, { merge: true });
      }
    },
    setInputNumberToState: (targetState, value) => {
      set({ [targetState]: value });
    },
  }))
);
