import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "../utils/createSelectors";

interface userState {
  isLogin: boolean;
  uerRole: number;
  userEmail: string;
  signUpEmail: string;
  signUpPassword: string;
  logIn: () => void;
  logOut: () => void;
  selectRole: (value: number) => void;
  keyInEmail: (value: string) => void;
  keyInPassWord: (value: string) => void;
  signUp: (auth: any, email: string, password: string) => Promise<void>;
  signOut: (auth: any) => Promise<void>;
  googleLogin: (auth: any, googleProvider: any) => Promise<void>;
  nativeLogin: (auth: any, email: string, password: string) => Promise<void>;
  getAuth: (auth: any, db: any) => Promise<void>;
}
export const useUserStore = createSelectors(
  create<userState>()(
    immer((set, get) => ({
      isLogin: false,
      bears: 0,
      uerRole: 0,
      userEmail: "",
      signUpEmail: "",
      signUpPassword: "",
      logIn: () => {
        set({ isLogin: true });
        set({ uerRole: 0 });
      },
      logOut: () => {
        set({ isLogin: false });
        set({ uerRole: 0 });
      },
      selectRole: (value) => {
        set({ uerRole: value });
      },
      keyInEmail: (value) => {
        set({ signUpEmail: value });
      },
      keyInPassWord: (value) => {
        set({ signUpPassword: value });
      },
      signUp: async (auth, email, password) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          console.log("signUp", user);
        } catch (e) {
          console.log(e.message);
        }
      },
      signOut: async (auth) => {
        try {
          await signOut(auth);
          console.log("signOUT");
        } catch (e) {
          console.error(e);
        }
      },
      googleLogin: async (auth, googleProvider) => {
        try {
          await signInWithPopup(auth, googleProvider);
          set({ isLogin: true });
          set({ uerRole: 0 });
        } catch (e) {
          console.error(e);
        }
      },
      nativeLogin: async (auth, email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          console.log("nativeLogin", user);
          set({ isLogin: true });
          set({ uerRole: 0 });
        } catch (e) {
          console.error(e);
        }
      },
      getAuth: async (auth, db) => {
        const userCol = collection(db, "users");
        const uerRole = get().uerRole;
        onAuthStateChanged(auth, async (user) => {
          console.log("getAuthUser", user);
          if (user) {
            const userRef = doc(userCol, user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) return;
            await setDoc(
              doc(userCol, user.uid),
              {
                id: user.uid,
                email: user.email,
                name: user.displayName,
                role: uerRole,
              },
              { merge: true }
            );
          }
        });
      },
    }))
  )
);
