import {
    Button,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
} from '@nextui-org/react';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { SelectStudentReceiver } from '../../components/SelectionUnits';
import SendIcon from '../../icons/send.png';
import TrashCan from '../../icons/trash.png';
import uploadIcon from '../../icons/upload.png';
import { MenuStore } from '../../stores/MenuStore';
import { useUserStore } from '../../stores/UserStore';

interface PropsType {
    itemPointer: number;
}
export default function Menu({ itemPointer }: PropsType) {
    const { menuList, resetMenuList, addMenuRecord, deleteReceivedMenu, menuMessage } = MenuStore();
    const getStudentList = useUserStore((state) => state.getStudentList);
    const currentUserRole = useUserStore((state) => state.currentUserRole);
    const waitingMenus = useUserStore((state) => state.waitingMenus);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const topContent = useMemo(() => {
        if (currentUserRole !== 1) return null;
        return (
            <div className="mx-4 my-2 flex h-7 w-7 items-center justify-center rounded-full">
                <Button
                    className="rounded-full bg-gray-400 text-lg text-white hover:bg-yellow-300"
                    onPress={onOpen}
                    endContent={<img className=" h-2/3 w-2/3" src={SendIcon} />}
                ></Button>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center">
                    <ModalContent>
                        <>
                            <ModalHeader className=" flex flex-col gap-1 pb-1">
                                Write Message & Send to Student
                            </ModalHeader>
                            <ModalBody>
                                <SelectStudentReceiver />
                            </ModalBody>
                        </>
                    </ModalContent>
                </Modal>
            </div>
        );
    }, [isOpen]);
    const bottomContent = useMemo(() => {
        return (
            <Button
                className=" w-full rounded-full bg-gray-400 text-lg text-white hover:bg-yellow-300"
                onClick={() => {
                    if (itemPointer < menuList.length) {
                        toast.error('請先完成目前項目');
                        return;
                    }
                    addMenuRecord();
                }}
                endContent={<img className=" w-9" src={uploadIcon} />}
            >
                上傳紀錄
            </Button>
        );
    }, []);

    function changeItemRecord(objIndex: number, itemIndex: number, itemQuantity: string) {
        const newItemRecord = menuList[objIndex].records.map((item, index) =>
            index === itemIndex ? Number(itemQuantity) : item
        );
        const newMenuList = menuList.map((item, index) =>
            index === objIndex ? { ...item, records: newItemRecord } : item
        );
        resetMenuList(newMenuList);
        console.log('newMenuList:', menuList);
    }

    useEffect(() => {
        getStudentList();
    }, []);

    return (
        <div className="w-full">
            <Table
                classNames={{
                    wrapper: ['h-full p-2 gap-2'],
                    th: [' text-center'],
                    tr: [' text-center'],
                }}
                color="default"
                topContent={currentUserRole === 1 ? topContent : null}
                topContentPlacement="inside"
                bottomContent={bottomContent}
                bottomContentPlacement="inside"
                aria-label="Example static collection table"
            >
                <TableHeader>
                    <TableColumn>執行狀態</TableColumn>
                    <TableColumn>項目名稱</TableColumn>
                    <TableColumn>訓練重量</TableColumn>
                    <TableColumn>刪除</TableColumn>
                </TableHeader>
                {menuList.length === 0 ? (
                    <TableBody emptyContent={'No rows to display.'}>{[]}</TableBody>
                ) : (
                    <TableBody>
                        {menuList.map((item, index) => {
                            const objIndex = index;
                            return (
                                <TableRow key={objIndex.toString()} className="">
                                    <TableCell>
                                        {itemPointer === index ? (
                                            <Chip size="sm" color="warning" variant="flat">
                                                進行中
                                            </Chip>
                                        ) : itemPointer > index ? (
                                            <Chip size="sm" color="success" variant="flat">
                                                完成了
                                            </Chip>
                                        ) : (
                                            <Chip size="sm" color="default" variant="flat">
                                                未開始
                                            </Chip>
                                        )}
                                    </TableCell>
                                    <TableCell className=" min-w-[90px]">{item.itemName}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col justify-start gap-x-1  md:flex-row">
                                            {item.records.map((load, index) => {
                                                return (
                                                    <input
                                                        className=" w-10 border-b-1 text-center"
                                                        min={0}
                                                        key={index}
                                                        type="number"
                                                        defaultValue={load}
                                                        onChange={(e) => {
                                                            const target = e.target as HTMLInputElement;
                                                            const value = target.value;
                                                            changeItemRecord(objIndex, index, value);
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="m-auto flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 hover:bg-yellow-400">
                                            <img
                                                className=" h-2/3 w-2/3"
                                                id={objIndex.toString()}
                                                src={TrashCan}
                                                onClick={(e) => {
                                                    const target = e.target as HTMLButtonElement;
                                                    const indexRemove = target.id;
                                                    console.log('indexRemove', indexRemove);
                                                    const newMenuList = menuList.filter(
                                                        (_, index) => index !== Number(indexRemove)
                                                    );
                                                    resetMenuList(newMenuList);
                                                }}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                )}
            </Table>
        </div>
    );
}
