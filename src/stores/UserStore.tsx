import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  DocumentData,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { create } from "zustand";
import { db, storage } from "../firebase";

interface userState {
  isLogin: boolean;
  signUpRole: number;
  signUpEmail: string;
  signUpName: string;
  signUpImage: File | null;
  signUpImageURL: string;
  signUpPassword: string;
  // signUpWithCoach: string;
  signUpWithCoach: { coachId: string; state: string };
  coachCalender: string;
  coachReserve: string;
  currentUserEmail: string;
  currentUserName: string;
  currentUserRole: number;
  currentUserImg: string;
  invitations: DocumentData[];
  myCoach: string;
  coachList: DocumentData[];
  calenderURL: string;
  reserveURL: string;
  logOut: () => void;
  selectRole: (value: number) => void;
  keyInEmail: (value: string) => void;
  keyInPassWord: (value: string) => void;
  setSignUpCoach: (value: string) => void;
  setInputTextToState: (targetState: string, value: string | File) => void;
  signUp: (auth: Auth, email: string, password: string) => Promise<void>;
  signOut: (auth: Auth) => Promise<void>;
  googleLogin: (
    auth: Auth,
    googleProvider: GoogleAuthProvider
  ) => Promise<void>;
  nativeLogin: (auth: Auth, email: string, password: string) => Promise<void>;
  getAuth: (auth: Auth, db: Firestore) => Promise<void>;
  sendInvitation: (
    coachId: string | null,
    currentUserId: string
  ) => Promise<void>;
  replyInvitation: (e: any, state: string) => Promise<void>;
  getCurrentUserInfo: () => Promise<void>;
  getCoachList: () => Promise<DocumentData[] | null>;
  uploadImage: (image: File | null, path: string) => Promise<void>;
  getUploadImage: (image: File | null, path: string) => Promise<void>;
  unsubscribeInvitations: () => void;
}

export const useUserStore = create<userState>()((set, get) => ({
  isLogin: Boolean(window.localStorage.getItem("UID")),
  signUpRole: 0,
  signUpEmail: "",
  signUpPassword: "",
  signUpName: "",
  signUpImage: null,
  signUpImageURL: "",
  signUpWithCoach: { coachId: "default", state: "" },
  //coachCalender, coachReserve是教練註冊時填入的資料
  coachCalender: "",
  coachReserve: "",
  currentUserEmail: "",
  currentUserName: "",
  currentUserRole: 0,
  currentUserImg: "",
  invitations: [],
  //myCoach是要coachId
  myCoach: "",
  coachList: [],
  calenderURL: "",
  reserveURL: "",

  logOut: () => {
    localStorage.clear();
    set({ signUpRole: 0 });
    set({ isLogin: false });
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
  // setSignUpCoach: (value) => {
  //   set({ signUpWithCoach: value });
  // },
  setSignUpCoach: (value) => {
    set({ signUpWithCoach: { coachId: value, state: "waiting" } });
  },
  setInputTextToState: (targetState, value) => {
    set({ [targetState]: value });
  },
  signUp: async (auth, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential", userCredential);
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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        set({ isLogin: true });
        // console.log("user", user);
        localStorage.setItem("UID", user.uid);
        const userRef = doc(userCol, user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) return;
        await setDoc(
          doc(userCol, user.uid),
          {
            id: user.uid,
            email: user.email,
            name: get().signUpName,
            role: get().signUpRole,
            coachCalender: get().coachCalender,
            coachReserve: get().coachReserve,
            myCoach: get().signUpWithCoach,
            userImage: get().signUpImageURL,
          },
          { merge: true }
        );
      }
    });
  },
  sendInvitation: async (coachId, currentUserId) => {
    console.log("StartSendCoachId", coachId);
    if (!coachId) return;
    console.log("coachId2", coachId);
    const invitationCol = collection(db, "users", coachId, "invitation");
    const newInvitationRef = doc(invitationCol, currentUserId);
    const docSnap = await getDoc(newInvitationRef);
    if (docSnap.exists()) return;
    const { id } = newInvitationRef;
    const invitationData = {
      senderId: currentUserId,
      state: "waiting",
    };
    await setDoc(
      newInvitationRef,
      { ...invitationData, id, sendTime: serverTimestamp() },
      { merge: true }
    );
    console.log("EndSendCoachId", coachId);
  },
  replyInvitation: async (e: any, state) => {
    const invitationId = e.target.dataset.id;
    console.log("invitationId", invitationId);
    const UID = localStorage.getItem("UID");
    const invitationCol = collection(db, "users", UID, "invitation");
    const invitationRef = doc(invitationCol, invitationId);
    const senderCol = collection(db, "users");
    const senderRef = doc(senderCol, invitationId);
    await updateDoc(invitationRef, {
      state: state,
    });
    await updateDoc(senderRef, {
      myCoach: { coachId: UID, state: state },
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
      set({ currentUserImg: currentUserInfo.userImage });
      if (currentUserInfo.role === 1) {
        set({ calenderURL: currentUserInfo.coachCalender });
        set({ reserveURL: currentUserInfo.coachReserve });
      } else if (currentUserInfo.role === 2) {
        const coachId = currentUserInfo.myCoach.coachId;
        const myCoachRef = doc(db, "users", coachId);
        const docMyCoachSnap = await getDoc(myCoachRef);
        const myCoachInfo = docMyCoachSnap.data();
        set({ myCoach: coachId });
        // set({
        //   signUpWithCoach: {
        //     coachId: currentUserInfo.myCoach.coachId,
        //     state: currentUserInfo.myCoach.state,
        //   },
        // });
        if (currentUserInfo.myCoach.state === "accept") {
          set({ calenderURL: myCoachInfo?.coachCalender });
          set({ reserveURL: myCoachInfo?.coachReserve });
        }
      }
    }
  },
  getCoachList: async () => {
    const userCol = collection(db, "users");
    const queryCoach = query(userCol, where("role", "==", 1));
    const docCoachSnap = await getDocs(queryCoach);
    if (!docCoachSnap) return null;
    const coachListData = docCoachSnap.docs.map((doc) => doc.data());
    // const coachList = coachListData.map((obj) =>
    //   obj.name ? obj.name : obj.email
    // );
    console.log("coachListData", coachListData);
    set({ coachList: coachListData });
    return coachListData;
  },

  uploadImage: async (image, signUpEmail) => {
    if (!image) return;
    const imageRef = ref(storage, `signUpImages/${signUpEmail}_${image.name}`);
    await uploadBytes(imageRef, image).then(() => {
      alert("image upload");
    });
  },
  getUploadImage: async (image, signUpEmail) => {
    if (!image) return;
    const imageRef = ref(storage, `signUpImages/${signUpEmail}_${image.name}`);
    getDownloadURL(imageRef)
      .then((url) => {
        set({ signUpImageURL: url });
        console.log("signUpImageURL", get().signUpImageURL);
      })
      .catch((error) => {
        console.error("getURLError:", error);
        alert("Error to get the image URL.");
      });
  },
  unsubscribeInvitations: () => {
    const UID = localStorage.getItem("UID");
    if (!UID) return;
    const waitingInvitation = query(
      collection(db, "users", UID, "invitation"),
      where("state", "==", "waiting"),
      orderBy("sendTime", "desc")
    );
    const user = query(collection(db, "users"), where("id", "==", UID));
    onSnapshot(waitingInvitation, (querySnapshot) => {
      const Invitations = querySnapshot.docs.map((doc) => doc.data());
      set({ invitations: Invitations });
    });
    onSnapshot(user, () => {
      // const newUserData = querySnapshot.docs.map((doc) => doc.data());
      // set({ calenderURL: Invitations });
      get().getCurrentUserInfo();
    });
  },

  // getCoachInfo: async () => {
  //   if (!auth.currentUser) return;
  //   const userCol = collection(db, "users");
  //   let calenderOwnerId = "";
  //   if (get().currentUserRole === 1) {
  //     calenderOwnerId = auth.currentUser.uid;
  //   } else if (get().currentUserRole === 2) {
  //     const docUserSnap = await getDoc(
  //       doc(userCol, "users", auth.currentUser.uid)
  //     );
  //     const currentUserInfo = docUserSnap.data();
  //     calenderOwnerId = currentUserInfo?.myCoach.coachId;
  //   }
  //   const calenderRef = doc(userCol, calenderOwnerId);
  //   const docSnap = await getDoc(calenderRef);
  //   const calenderInfo = docSnap.data();
  //   set({ calenderURL: calenderInfo?.coachCalender });
  //   set({ reserveURL: calenderInfo?.coachReserve });
  //   console.log("calenderURL", get().calenderURL);
  //   console.log("reserveURL", get().reserveURL);
  // },
}));
