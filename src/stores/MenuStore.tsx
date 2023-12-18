import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { auth, db } from '../firebase';
interface maxValue {
    [key: string]: number | undefined;
}
export interface MenuList {
    itemName: string;
    loading: number;
    runCount: number;
    records: number[];
}
interface MenuStore {
    itemGroup: string;
    itemGroupIndex: number;
    itemName: string;
    loading: string | number;
    runCount: string | number;
    targetStudent: string;
    menuList: MenuList[] | [];
    menuPublic: boolean;
    menuMessage: string;
    setItemGroup: (value: string) => void;
    setItemGroupIndex: (value: number) => void;
    setItemName: (value: string) => void;
    setLoading: (value: number | string) => void;
    setRunCount: (value: number) => void;
    setTargetStudent: (value: string) => void;
    setMenuList: () => void;
    resetMenuList: (
        value: {
            itemName: string;
            loading: number;
            runCount: number;
            records: number[];
        }[]
    ) => void;
    setMenuPublic: () => void;
    addMenuRecord: () => Promise<void>;
    clearMenuList: () => void;
    sentToStudent: (
        currentUserName: string,
        target: string,
        message: string
    ) => Promise<void>;
    deleteReceivedMenu: (id: string) => Promise<void>;
}

const menuListString = localStorage.getItem('menuList')
    ? JSON.parse(localStorage.getItem('menuList')!)
    : [];
export const MenuStore = create<MenuStore>()((set, get) => ({
    itemGroup: '',
    itemGroupIndex: 0,
    itemName: '',
    loading: 'default',
    runCount: 'default',
    targetStudent: 'default',
    menuList: menuListString,
    menuPublic: true,
    menuMessage: 'test',
    setItemGroup: (value) => {
        set({ itemGroup: value });
    },
    setItemGroupIndex: (value) => {
        set({ itemGroupIndex: Number(value) });
    },
    setItemName: (value) => {
        set({ itemName: value });
    },
    setLoading: (value) => {
        set({ loading: value });
    },
    setRunCount: (value) => {
        set({ runCount: value });
    },
    setTargetStudent: (value) => {
        set({ targetStudent: value });
    },

    setMenuList: () => {
        if (get().itemName === '') {
            toast.error('請選擇訓練項目');
            return;
        }
        if (get().loading === 'default' || get().runCount === 'default') {
            toast.error('請設定訓練組數與重量');
            return;
        }
        set((state) => ({
            menuList: [
                ...state.menuList,
                {
                    itemName: get().itemName,
                    loading: Number(get().loading),
                    runCount: Number(get().runCount),
                    records: new Array(Number(get().runCount)).fill(
                        Number(get().loading)
                    ),
                },
            ],
        }));
        localStorage.setItem('menuList', JSON.stringify(get().menuList));

        toast.success('新增訓練項目成功');
    },
    resetMenuList: (value) => {
        set({ menuList: value });
        localStorage.setItem('menuList', JSON.stringify(get().menuList));
    },
    setMenuPublic: () => {
        set((state) => ({ menuPublic: !state.menuPublic }));
    },

    addMenuRecord: async () => {
        if (auth.currentUser) {
            const CurrentUserId = auth.currentUser.uid;
            const docMenuRecordsCol = collection(
                db,
                'users',
                CurrentUserId,
                'menuRecords'
            );
            const newDocRef = doc(docMenuRecordsCol);
            const { id } = newDocRef;
            const maxValue: maxValue = {};
            get().menuList.forEach((item) => {
                const { itemName, records } = item;
                const maxRecord = Math.max(...records);

                if (!maxValue[itemName] || maxRecord > maxValue[itemName]!) {
                    maxValue[itemName] = maxRecord;
                }
            });
            const MenuRecord = {
                content: get().menuList,
                isPublic: get().menuPublic,
                MaxSummary: maxValue,
            };
            await setDoc(
                newDocRef,
                { ...MenuRecord, id, trainingTime: serverTimestamp() },
                { merge: true }
            );
            localStorage.removeItem('menuList');
            get().resetMenuList([]);
            toast.success('上傳記錄完成');
        }
    },
    clearMenuList: () => {
        localStorage.removeItem('menuList');
        get().resetMenuList([]);
    },

    sentToStudent: async (currentUserName, target, message) => {
        if (get().menuList.length === 0) {
            toast.error(`請建立訓練項目`);
            return;
        }
        if (target === 'default') {
            toast.error('請選擇學員');
            return;
        }
        const userCol = collection(db, 'users');
        const targetStudentDocRef = query(userCol, where('name', '==', target));
        const docStudentSnap = await getDocs(targetStudentDocRef);
        if (!docStudentSnap) {
            toast.error('查無此學員');
            return;
        }
        const targetStudentID = docStudentSnap.docs[0].data().id;
        const docMenuRecordsCol = collection(
            db,
            'users',
            targetStudentID,
            'receivedMenu'
        );
        const newDocRef = doc(docMenuRecordsCol);
        const { id } = newDocRef;
        const newMenu = {
            content: get().menuList,
            isPublic: get().menuPublic,
            senderName: currentUserName,
            message: message,
        };
        await setDoc(
            newDocRef,
            { ...newMenu, id, sendTime: serverTimestamp() },
            { merge: true }
        );
        toast.success('已傳送');
    },
    deleteReceivedMenu: async (id) => {
        const docMenuRecordsCol = collection(
            db,
            'users',
            auth.currentUser?.uid ?? '',
            'receivedMenu'
        );
        const docRef = doc(docMenuRecordsCol, id);
        await deleteDoc(docRef);
    },
}));
