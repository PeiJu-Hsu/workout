import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import SendIcon from '../../icons/send.png';
import { MenuStore } from '../../stores/MenuStore';
import { useUserStore } from '../../stores/UserStore';

export default function SelectStudentReceiver({
    onClose,
}: {
    onClose: () => void;
}) {
    const studentList = useUserStore((state) => state.studentList);
    const currentUserName = useUserStore((state) => state.currentUserName);
    const sentToStudent = MenuStore((state) => state.sentToStudent);
    const [receiver, setReceiver] = useState('default');
    const [menuMessage, setMenuMessage] = useState('');
    return (
        <>
            <Input
                maxLength={8}
                description="最多輸入8個字"
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
                    className=" rounded-full bg-gray-400 text-lg text-white hover:bg-black"
                    endContent={<img className=" h-6 w-6" src={SendIcon} />}
                    onClick={() => {
                        sentToStudent(currentUserName, receiver, menuMessage);
                        if (receiver !== 'default') {
                            onClose();
                        }
                    }}
                >
                    傳送
                </Button>
            </div>
        </>
    );
}
