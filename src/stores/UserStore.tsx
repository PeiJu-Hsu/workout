import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Firestore, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase";

interface userState {
  isLogin: boolean;
  signUpRole: number;
  signUpEmail: string;
  signUpPassword: string;
  currentUserEmail: string;
  currentUserName: string;
  currentUserRole: number;
  logOut: () => void;
  selectRole: (value: number) => void;
  keyInEmail: (value: string) => void;
  keyInPassWord: (value: string) => void;
  signUp: (auth: Auth, email: string, password: string) => Promise<void>;
  signOut: (auth: Auth) => Promise<void>;
  googleLogin: (
    auth: Auth,
    googleProvider: GoogleAuthProvider
  ) => Promise<void>;
  nativeLogin: (auth: Auth, email: string, password: string) => Promise<void>;
  getAuth: (auth: Auth, db: Firestore) => Promise<void>;
  getCurrentUserInfo: () => Promise<void>;
}

export const useUserStore = create<userState>()((set, get) => ({
  isLogin: Boolean(window.localStorage.getItem("UID")),
  signUpRole: 0,
  signUpEmail: "",
  signUpPassword: "",
  currentUserEmail: "",
  currentUserName: "",
  currentUserRole: 0,

  logOut: () => {
    set({ isLogin: false });
    set({ signUpRole: 0 });
    localStorage.removeItem("UID");
    localStorage.removeItem("currentPathname");
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
      console.log(userCredential);
    } catch (e) {
      console.error(e);
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
      console.log(userCredential);
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
        set({ isLogin: true });
        localStorage.setItem("UID", user.uid);
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
    const UID = localStorage.getItem("UID");
    if (UID) {
      const CurrentUserId = UID;
      const userRef = doc(db, "users", CurrentUserId);
      const docUserSnap = await getDoc(userRef);
      const currentUserInfo = docUserSnap.data();
      if (!currentUserInfo) return;
      set({ currentUserEmail: currentUserInfo.email });
      set({ currentUserName: currentUserInfo.name });
      set({ currentUserRole: currentUserInfo.role });
    }
  },
}));
