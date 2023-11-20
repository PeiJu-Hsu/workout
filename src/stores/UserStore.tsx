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
import { auth, db } from "../firebase";
import { createSelectors } from "../utils/createSelectors";

interface userState {
  isLogin: boolean;
  signUpRole: number;
  signUpEmail: string;
  signUpPassword: string;
  currentUserEmail: string;
  currentUserName: string;
  currentUserRole: number;
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
  getCurrentUserInfo: () => Promise<void>;
}
export const useUserStore = createSelectors(
  create<userState>()(
    immer((set, get) => ({
      isLogin: Boolean(auth),

      signUpRole: 0,
      signUpEmail: "",
      signUpPassword: "",
      currentUserEmail: "",
      currentUserName: "",
      currentUserRole: 0,

      logIn: () => {
        set({ isLogin: true });
        set({ signUpRole: 0 });
      },
      logOut: () => {
        set({ isLogin: false });
        set({ signUpRole: 0 });
      },
      selectRole: (value) => {
        set({ signUpRole: value });
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
        } catch (e) {
          console.log(e.message);
        }
      },
      signOut: async (auth) => {
        try {
          await signOut(auth);
        } catch (e) {
          console.error(e);
        }
      },
      googleLogin: async (auth, googleProvider) => {
        try {
          await signInWithPopup(auth, googleProvider);
          set({ isLogin: true });
          set({ signUpRole: 0 });
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
          set({ isLogin: true });
          set({ signUpRole: 0 });
        } catch (e) {
          console.error(e);
        }
      },
      getAuth: async (auth, db) => {
        const userCol = collection(db, "users");
        const signUpRole = get().signUpRole;
        onAuthStateChanged(auth, async (user) => {
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
                role: signUpRole,
              },
              { merge: true }
            );
          }
        });
      },
      getCurrentUserInfo: async () => {
        if (auth.currentUser) {
          const CurrentUserId = auth.currentUser.uid;
          const userRef = doc(db, "users", CurrentUserId);
          const docUserSnap = await getDoc(userRef);
          const currentUserInfo = docUserSnap.data();
          if (!currentUserInfo) return;
          set({ currentUserEmail: currentUserInfo.email });
          set({ currentUserName: currentUserInfo.name });
          set({ currentUserRole: currentUserInfo.role });
        }
      },
    }))
  )
);
