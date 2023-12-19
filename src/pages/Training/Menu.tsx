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
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { SelectStudentReceiver } from '../../components/SelectionUnits';
import SendIcon from '../../icons/send.png';
import TrashCan from '../../icons/trash.png';
import { MenuStore } from '../../stores/MenuStore';
import { useUserStore } from '../../stores/UserStore';

interface PropsType {
    itemPointer: number;
}
export default function Menu({ itemPointer }: PropsType) {
    const { menuList, resetMenuList, addMenuRecord } = MenuStore();
    const getStudentList = useUserStore((state) => state.getStudentList);
    const currentUserRole = useUserStore((state) => state.currentUserRole);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const topContent = (
        <div className="mx-8 my-1 flex h-7 w-7 items-center justify-center rounded-full">
            <Button
                className="rounded-full h-8 bg-gray-400 text-lg text-white hover:bg-black"
                onPress={onOpen}
                endContent={<img className=" h-6 w-6" src={SendIcon} />}
            ></Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="bottom-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className=" flex flex-col gap-1 pb-1">
                                發送菜單給學生
                            </ModalHeader>
                            <ModalBody>
                                <SelectStudentReceiver onClose={onClose} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );

    const bottomContent = (
        <Button
            className=" w-full rounded-full bg-gray-400 text-lg text-white hover:bg-black"
            onClick={() => {
                if (itemPointer < menuList.length) {
                    toast.error('請先完成目前項目');
                    return;
                }
                if (menuList.length === 0) {
                    toast.error('沒有紀錄可以上傳');
                    return;
                }
                addMenuRecord();
            }}
            endContent={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                </svg>
            }
        >
            上傳紀錄
        </Button>
    );

    function changeItemRecord(
        objIndex: number,
        itemIndex: number,
        itemQuantity: string
    ) {
        const newItemRecord = menuList[objIndex].records.map((item, index) =>
            index === itemIndex ? Number(itemQuantity) : item
        );
        const newMenuList = menuList.map((item, index) =>
            index === objIndex ? { ...item, records: newItemRecord } : item
        );
        resetMenuList(newMenuList);
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
                    <TableBody emptyContent={'尚未新增項目'}>{[]}</TableBody>
                ) : (
                    <TableBody>
                        {menuList.map((item, index) => {
                            const objIndex = index;
                            return (
                                <TableRow
                                    key={objIndex.toString()}
                                    className=""
                                >
                                    <TableCell>
                                        {itemPointer === index ? (
                                            <Chip
                                                size="sm"
                                                color="warning"
                                                variant="flat"
                                            >
                                                進行中
                                            </Chip>
                                        ) : itemPointer > index ? (
                                            <Chip
                                                size="sm"
                                                color="success"
                                                variant="flat"
                                            >
                                                完成了
                                            </Chip>
                                        ) : (
                                            <Chip
                                                size="sm"
                                                color="default"
                                                variant="flat"
                                            >
                                                未開始
                                            </Chip>
                                        )}
                                    </TableCell>
                                    <TableCell className=" min-w-[90px]">
                                        {item.itemName}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col justify-center gap-x-1  md:flex-row">
                                            {item.records.map((load, index) => {
                                                return (
                                                    <input
                                                        className="w-10 border-b-1 text-center"
                                                        min={0}
                                                        max={200}
                                                        key={index}
                                                        type="number"
                                                        defaultValue={load}
                                                        onChange={(e) => {
                                                            const target =
                                                                e.target as HTMLInputElement;
                                                            const value =
                                                                target.value;
                                                            changeItemRecord(
                                                                objIndex,
                                                                index,
                                                                value
                                                            );
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="cursor-pointer  m-auto flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 hover:bg-black">
                                            <img
                                                className=" h-2/3 w-2/3"
                                                id={objIndex.toString()}
                                                src={TrashCan}
                                                onClick={(e) => {
                                                    const target =
                                                        e.target as HTMLButtonElement;
                                                    const indexRemove =
                                                        target.id;
                                                    const newMenuList =
                                                        menuList.filter(
                                                            (_, index) =>
                                                                index !==
                                                                Number(
                                                                    indexRemove
                                                                )
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
