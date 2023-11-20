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
  calculateBMI: () => string;
  calculateFatRatio: () => string;
  fetchInBodyData: () => Promise<DocumentData[] | undefined>;
  setInBodyStatus: (inBodyData: DocumentData) => void;
  addInBodyData: () => Promise<void>;
  setInputNumberToState: (targetState: any, value: number | Date) => void;
}
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
      if (auth.currentUser) {
        const CurrentUserId = auth.currentUser.uid;
        const docInBodyCol = collection(db, "users", CurrentUserId, "inBody");
        const orderedQuery = query(
          docInBodyCol,
          orderBy("measureTime", "desc")
        );
        const docInBodySnap = await getDocs(orderedQuery);
        const inBodyData = docInBodySnap.docs.map((doc) => doc.data());
        console.log("fetchBodyData", inBodyData);
        get().setInBodyStatus(inBodyData[0]);
        console.log("set", get().measureTime);
        return inBodyData;
      }
    },
    setInBodyStatus: (inBodyData) => {
      set({ measureTime: inBodyData.measureTime });
      set({ inBodyScore: inBodyData.inBodyScore });
      set({ height: inBodyData.height });
      set({ weight: inBodyData.weight });
      set({ bodyWater: inBodyData.bodyWater });
      set({ bodyFat: inBodyData.bodyFat });
      set({ bodyMineral: inBodyData.bodyMineral });
      set({ bodyMuscle: inBodyData.bodyMuscle });
      set({ bmi: inBodyData.bmi });
      set({ controlWeight: inBodyData.controlWeight });
      set({ controlFat: inBodyData.controlFat });
      set({ controlMuscle: inBodyData.controlMuscle });
      set({ fatRatio: inBodyData.fatRatio });
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
        console.log("addInBodyData", inBodyData);
        await setDoc(newDocRef, { ...inBodyData, id }, { merge: true });
      }
    },
    setInputNumberToState: (targetState, value) => {
      set({ [targetState]: value });
    },
  }))
);
