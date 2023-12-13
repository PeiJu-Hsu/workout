import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import SendIcon from '../icons/send.png';
import { MenuStore } from '../stores/MenuStore';
import { useUserStore } from '../stores/UserStore';
import { group, groupList } from '../utils/TrainingItems';
// interface GroupItemType {
//     sectionName: string;
//     sectionItems: string[];
//   }

// interface SelectMuscleType {
//     group: GroupItemType[];
//   }
export function SelectMuscle() {
    const setItemGroup = MenuStore((state) => state.setItemGroup);
    const setItemGroupIndex = MenuStore((state) => state.setItemGroupIndex);
    const setItemName = MenuStore((state) => state.setItemName);
    return (
        <Select
            isRequired
            data-filled:after="OK"
            label="選擇訓練部位"
            placeholder="選擇訓練部位"
            defaultSelectedKeys=""
            // className=" max-w-xs"
            onChange={(e) => {
                setItemGroup(e.target.value);
                setItemGroupIndex(groupList.indexOf(e.target.value));
                setItemName('default');
            }}
        >
            {group.map((item) => (
                <SelectItem key={item.sectionName} value={item.sectionName}>
                    {item.sectionName}
                </SelectItem>
            ))}
        </Select>
    );
}
export function SelectWorkOutItem() {
    const setItemName = MenuStore((state) => state.setItemName);
    const itemGroupIndex = MenuStore((state) => state.itemGroupIndex);
    return (
        <Select
            isRequired
            label="選擇訓練項目"
            placeholder="選擇訓練項目"
            defaultSelectedKeys=""
            // className="max-w-xs"
            onChange={(e) => {
                setItemName(e.target.value);
            }}
        >
            {group[itemGroupIndex].sectionItems.map((item) => (
                <SelectItem key={item} value={item}>
                    {item}
                </SelectItem>
            ))}
        </Select>
    );
}
export function SelectNumber({ max }: { max: number }) {
    const optionArray = new Array(max).fill(0).map((_item, index) => index + 1);
    const setRunCount = MenuStore((state) => state.setRunCount);
    return (
        <Select
            isRequired
            label="設定組數"
            placeholder="設定組數"
            defaultSelectedKeys=""
            // className="max-w-xs"
            onChange={(e) => {
                setRunCount(Number(e.target.value));
            }}
        >
            {optionArray.map((item) => (
                <SelectItem className="text-black" key={item} value={item}>
                    {item.toString()}
                </SelectItem>
            ))}
        </Select>
    );
}
export function SelectStudentReceiver() {
    const studentList = useUserStore((state) => state.studentList);
    const currentUserName = useUserStore((state) => state.currentUserName);
    // const setTargetStudent = MenuStore((state) => state.setTargetStudent);
    const sentToStudent = MenuStore((state) => state.sentToStudent);
    const [receiver, setReceiver] = useState('default');
    const [menuMessage, setMenuMessage] = useState('');
    return (
        <>
            <Input
                type="text"
                variant="underlined"
                label="你的留言"
                onChange={(e) => {
                    setMenuMessage(e.target.value);
                }}
            />
            <Select
                label="選擇學員"
                placeholder="選擇學員"
                defaultSelectedKeys=""
                // className="  max-w-xs"
                onChange={(e) => {
                    setReceiver(e.target.value);
                }}
            >
                {studentList.map((item) => (
                    <SelectItem key={item.senderName} value={item.id}>
                        {item.senderName}
                    </SelectItem>
                ))}
            </Select>
            <div className=" flex justify-end">
                <Button
                    className=" rounded-full bg-gray-400 text-lg text-white hover:bg-yellow-300"
                    // className="text-white"
                    endContent={<img className=" h-6 w-6" src={SendIcon} />}
                    onClick={() => {
                        sentToStudent(currentUserName, receiver, menuMessage);
                    }}
                >
                    傳送
                </Button>
            </div>
        </>
    );
}
