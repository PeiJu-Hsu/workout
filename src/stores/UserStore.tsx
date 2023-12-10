import {
    Auth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import {
    DocumentData,
    Firestore,
    collection,
    deleteDoc,
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
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { db, storage } from '../firebase';
import { getformatTime } from './InBodyStore';
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
    myCoachName: string;
    coachList: DocumentData[];
    studentList: DocumentData[];
    calenderURL: string;
    reserveURL: string;
    waitingMenus: DocumentData[] | any;
    logOut: () => void;
    selectRole: (value: number) => void;
    keyInEmail: (value: string) => void;
    keyInPassWord: (value: string) => void;
    setSignUpCoach: (value: string) => void;
    setInputTextToState: (targetState: string, value: string | File) => void;
    signUp: (auth: Auth, email: string, password: string) => Promise<void>;
    signOut: (auth: Auth) => Promise<void>;
    googleLogin: (auth: Auth, googleProvider: GoogleAuthProvider) => Promise<void>;
    nativeLogin: (auth: Auth, email: string, password: string) => Promise<void>;
    getAuth: (auth: Auth, db: Firestore) => Promise<void>;
    getName: (currentUserId: string) => Promise<string | undefined>;
    sendInvitation: (coachId: string | null, currentUserId: string) => Promise<void>;
    sendInvitationAtHome: () => Promise<void>;
    replyInvitation: (e: any, state: string) => Promise<void>;
    deleteInvitation: () => Promise<void>;
    getCurrentUserInfo: () => Promise<void>;
    getCoachList: () => Promise<DocumentData[] | null>;
    getStudentList: () => Promise<DocumentData[] | null>;
    uploadImage: (image: File | null, path: string) => Promise<void>;
    getUploadImage: (image: File | null, path: string) => Promise<void>;
    unsubscribeInvitations: () => void;
    updateProfile: () => Promise<void>;
    updateUserName: () => Promise<void>;
    updateCoach: () => Promise<void>;
}

export const useUserStore = create<userState>()((set, get) => ({
    isLogin: Boolean(window.localStorage.getItem('UID')),
    signUpRole: 0,
    signUpEmail: '',
    signUpPassword: '',
    signUpName: '',
    signUpImage: null,
    signUpImageURL: '',
    signUpWithCoach: { coachId: '', state: '' },
    //coachCalender, coachReserve是教練註冊時填入的資料
    coachCalender: '',
    coachReserve: '',
    currentUserEmail: '',
    currentUserName: '',
    currentUserRole: 0,
    currentUserImg: '',
    invitations: [],
    //myCoach是要coachId
    myCoach: '',
    myCoachName: '',
    coachList: [],
    studentList: [],
    calenderURL: '',
    reserveURL: '',
    waitingMenus: [],

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
        set({ signUpWithCoach: { coachId: value, state: 'waiting' } });
    },
    setInputTextToState: (targetState, value) => {
        set({ [targetState]: value });
        console.log('targetState', targetState);
        console.log('value', value);
    },
    signUp: async (auth, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('userCredential', userCredential);
        } catch (e: any) {
            console.error(e);
            toast.error(e.message, { duration: 3000 });
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
            toast(`👋 Welcome Back`);
        } catch (e) {
            console.error(e);
        }
    },
    nativeLogin: async (auth, email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast(`👋 Welcome Back`);
            console.log(userCredential);
        } catch (e: any) {
            console.error(e);
            toast.error(e.message, { duration: 3000 });
        }
    },
    getAuth: async (auth, db) => {
        const userCol = collection(db, 'users');
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                localStorage.setItem('UID', user.uid);
                const userRef = doc(userCol, user.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists() && docSnap.data()?.role !== get().signUpRole) {
                    set({ signUpRole: docSnap.data()?.role });
                    set({ isLogin: true });
                    return;
                } else if (!docSnap.exists()) {
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
                    set({ isLogin: true });
                }
            }
        });
    },
    getName: async (currentUserId: string) => {
        const userRef = doc(db, 'users', currentUserId);
        const docUserSnap = await getDoc(userRef);
        const currentUserInfo = docUserSnap.data();
        const name = currentUserInfo?.name;
        return name;
    },
    sendInvitation: async (coachId, currentUserId) => {
        console.log('StartSendCoachId', coachId);
        if (!coachId) return;
        console.log('coachId2', coachId);
        const invitationCol = collection(db, 'users', coachId, 'invitation');
        const newInvitationRef = doc(invitationCol, currentUserId);
        const docSnap = await getDoc(newInvitationRef);
        if (docSnap.exists()) return;
        const { id } = newInvitationRef;
        // const getName = async (currentUserId: string) => {
        //   const userRef = doc(db, "users", currentUserId);
        //   const docUserSnap = await getDoc(userRef);
        //   const currentUserInfo = docUserSnap.data();
        //   return currentUserInfo?.name;
        // };
        const invitationData = {
            senderName: await get().getName(currentUserId),
            state: 'waiting',
        };
        await setDoc(newInvitationRef, { ...invitationData, id, sendTime: serverTimestamp() }, { merge: true });
        console.log('EndSendCoachId', coachId);
    },
    sendInvitationAtHome: async () => {
        const UID = localStorage.getItem('UID');
        const userCol = collection(db, 'users');
        const userDocRef = doc(userCol, UID!);
        const userData = await getDoc(userDocRef);
        const coachId = userData.data()?.myCoach.coachId;
        const invitationCol = collection(db, 'users', coachId, 'invitation');
        const newInvitationRef = doc(invitationCol, UID!);
        const docSnap = await getDoc(newInvitationRef);
        if (docSnap.exists()) return;
        const { id } = newInvitationRef;
        // const getName = async (currentUserId: string) => {
        //   const userRef = doc(db, "users", currentUserId);
        //   const docUserSnap = await getDoc(userRef);
        //   const currentUserInfo = docUserSnap.data();
        //   return currentUserInfo?.name;
        // };
        const invitationData = {
            senderName: await get().getName(UID!),
            state: 'waiting',
        };
        await setDoc(doc(invitationCol, UID!), { ...invitationData, id, sendTime: serverTimestamp() }, { merge: true });
    },
    replyInvitation: async (e: any, state) => {
        const invitationId = e.target.dataset.id;
        console.log('invitationId', invitationId);
        const UID = localStorage.getItem('UID');
        const invitationCol = collection(db, 'users', UID!, 'invitation');
        const invitationRef = doc(invitationCol, invitationId);
        const senderCol = collection(db, 'users');
        const senderRef = doc(senderCol, invitationId);
        await updateDoc(invitationRef, {
            state: state,
        });
        await updateDoc(senderRef, {
            myCoach: { coachId: UID, state: state },
        });
    },
    deleteInvitation: async () => {
        console.log('myCoach', get().myCoach);
        const UID = localStorage.getItem('UID');
        const docMenuRecordsCol = collection(db, 'users', get().myCoach, 'invitation');
        const docRef = doc(docMenuRecordsCol, UID!);
        await deleteDoc(docRef);
    },
    getCurrentUserInfo: async () => {
        const UID = localStorage.getItem('UID');
        if (UID) {
            const CurrentUserId = UID;
            const userRef = doc(db, 'users', CurrentUserId);
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
                const myCoachRef = doc(db, 'users', coachId);
                const docMyCoachSnap = await getDoc(myCoachRef);
                const myCoachInfo = docMyCoachSnap.data();
                if (!myCoachInfo) return;
                set({ myCoach: coachId });
                set({ myCoachName: myCoachInfo.name });
                set({
                    signUpWithCoach: {
                        coachId: currentUserInfo.myCoach.coachId,
                        state: currentUserInfo.myCoach.state,
                    },
                });
                if (currentUserInfo.myCoach.state === 'accept') {
                    set({ calenderURL: myCoachInfo?.coachCalender });
                    set({ reserveURL: myCoachInfo?.coachReserve });
                }
            }
        }
    },
    getCoachList: async () => {
        const userCol = collection(db, 'users');
        const queryCoach = query(userCol, where('role', '==', 1));
        const docCoachSnap = await getDocs(queryCoach);
        if (!docCoachSnap) return null;
        const coachListData = docCoachSnap.docs.map((doc) => doc.data());
        set({ coachList: coachListData });
        return coachListData;
    },
    getStudentList: async () => {
        const UID = localStorage.getItem('UID');
        const invitationCol = collection(db, 'users', UID!, 'invitation');
        const queryCoach = query(invitationCol, where('state', '==', 'accept'));
        const docStudentSnap = await getDocs(queryCoach);
        if (!docStudentSnap) return null;
        const studentListData = docStudentSnap.docs.map((doc) => doc.data());
        // const coachList = coachListData.map((obj) =>
        //   obj.name ? obj.name : obj.email
        // );
        set({ studentList: studentListData });
        return studentListData;
    },

    uploadImage: async (image, signUpEmail) => {
        if (!image) return;
        const imageRef = ref(storage, `signUpImages/${signUpEmail}_${image.name}`);
        await uploadBytes(imageRef, image).then(() => {
            toast.success('Image upload success!', { duration: 3000 });
        });
    },
    getUploadImage: async (image, signUpEmail) => {
        if (!image) return;
        const imageRef = ref(storage, `signUpImages/${signUpEmail}_${image.name}`);
        getDownloadURL(imageRef)
            .then((url) => {
                set({ signUpImageURL: url });
                toast.success('Save your image success!', { duration: 3000 });
            })
            .catch((error) => {
                console.error('getURLError:', error);
                toast.error('Error happen during getYour image', { duration: 3000 });
            });
    },
    updateProfile: async () => {
        const UID = localStorage.getItem('UID');
        const userRef = doc(db, 'users', UID!);
        await updateDoc(userRef, {
            name: get().signUpName,
            role: get().signUpRole,
            coachCalender: get().coachCalender,
            coachReserve: get().coachReserve,
            myCoach: get().signUpWithCoach,
        });
    },
    updateUserName: async () => {
        const UID = localStorage.getItem('UID');
        const userRef = doc(db, 'users', UID!);
        await updateDoc(userRef, {
            name: get().signUpName,
        });
        toast.success('修改完成', { duration: 3000 });
    },
    updateCoach: async () => {
        const UID = localStorage.getItem('UID');
        const userRef = doc(db, 'users', UID!);
        await updateDoc(userRef, {
            myCoach: get().signUpWithCoach,
        });
        toast.success('申請修改完成', { duration: 3000 });
    },
    unsubscribeInvitations: () => {
        const UID = localStorage.getItem('UID');
        if (!UID) return;
        const waitingInvitation = query(
            collection(db, 'users', UID, 'invitation'),
            where('state', '==', 'waiting'),
            orderBy('sendTime', 'desc')
        );
        const receivedMenu = query(collection(db, 'users', UID, 'receivedMenu'), orderBy('sendTime', 'desc'));
        const user = query(collection(db, 'users'), where('id', '==', UID));
        onSnapshot(receivedMenu, (querySnapshot) => {
            const waitingMenus = querySnapshot.docs.map((doc) => doc.data());
            if (waitingMenus.length === 0) return;
            waitingMenus.map((obj) => {
                obj.formatTime = getformatTime(obj.sendTime);
            });
            console.log('waitingMenus', waitingMenus);
            set({ waitingMenus: waitingMenus });
        });
        onSnapshot(waitingInvitation, (querySnapshot) => {
            const Invitations = querySnapshot.docs.map((doc) => doc.data());
            set({ invitations: Invitations });
        });
        onSnapshot(user, (querySnapshot) => {
            const newUserData = querySnapshot.docs.map((doc) => doc.data());
            //   set({ calenderURL: Invitations });
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
