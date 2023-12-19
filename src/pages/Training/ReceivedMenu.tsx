import { DocumentData } from '@firebase/firestore';
import {
    Button,
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
    Tooltip,
    useDisclosure,
} from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MenuList, MenuStore } from '../../stores/MenuStore';
import { useUserStore } from '../../stores/UserStore';

export default function ReceivedMenu() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const waitingMenus = useUserStore((state) => state.waitingMenus);
    const { resetMenuList, deleteReceivedMenu } = MenuStore();
    const [openItem, setOpenItem] = useState(0);
    const handleOpen = (itemIndex: number) => {
        setOpenItem(itemIndex);
        onOpen();
    };
    const handleAcceptMenu = () => {
        resetMenuList(waitingMenus[openItem]?.content);
        deleteReceivedMenu(waitingMenus[openItem].id);
    };
    const handleRejectMenu = () => {
        deleteReceivedMenu(waitingMenus[openItem].id);
    };
    return (
        <>
            {waitingMenus.map((item: DocumentData, index: number) => {
                return (
                    <Tooltip
                        key={item.id}
                        placement="bottom"
                        content={`日期:${item.formatTime}`}
                    >
                        <div
                            className="text-center cursor-pointer w-full rounded-full bg-gray-100 text-lg text-black hover:bg-gray-300 hover:text-white"
                            onClick={() => {
                                handleOpen(index);
                            }}
                            // startContent={
                            //     <img className=" h-6 w-6" src={SendIcon} />
                            // }
                        >
                            {item.message || '新的菜單'}
                        </div>
                    </Tooltip>
                );
            })}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="bottom-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className=" flex flex-col gap-1 pb-1">
                                訓練菜單內容
                            </ModalHeader>
                            <ModalBody>
                                <Table
                                    classNames={{
                                        wrapper: ['h-full p-2 gap-2'],
                                        th: [' text-center'],
                                        tr: [' text-center'],
                                    }}
                                    color="default"
                                    aria-label="Example static collection table"
                                >
                                    <TableHeader>
                                        {/* <TableColumn>STATUS</TableColumn> */}
                                        <TableColumn>項目名稱</TableColumn>
                                        <TableColumn>目標組數</TableColumn>
                                        <TableColumn>目標重量</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {waitingMenus[openItem]?.content.map(
                                            (item: MenuList, index: number) => {
                                                return (
                                                    <TableRow
                                                        key={index}
                                                        className=""
                                                    >
                                                        <TableCell className=" min-w-[90px]">
                                                            {item.itemName}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.runCount}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.loading}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }
                                        )}
                                    </TableBody>
                                </Table>

                                <div className="flex justify-center">
                                    <Button
                                        className="  rounded-full bg-gray-400 text-lg text-white hover:bg-black"
                                        onClick={() => {
                                            handleAcceptMenu();
                                            toast.success('更新訓練菜單完成');
                                            onClose();
                                        }}
                                    >
                                        接受
                                    </Button>
                                    <Button
                                        className="  rounded-full bg-gray-400 text-lg text-white hover:bg-black"
                                        onClick={() => {
                                            handleRejectMenu();
                                            onClose();
                                        }}
                                    >
                                        拒絕
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
