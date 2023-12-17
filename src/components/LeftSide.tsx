import {
    Avatar,
    Button,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { InputText } from '../components/InputUnit';
import { auth } from '../firebase';
import HomeIcon from '../icons/home.png';
import inBodyIcon from '../icons/inbody.png';
import LogOut from '../icons/logout.png';
import RecordIcon from '../icons/records.png';
import Task from '../icons/task.png';
import SelectCoach from '../pages/SignUp/SelectCoach';
import { useUserStore } from '../stores/UserStore';
import Invitation from './Invitation';
import Logo from './Logo';
interface leftSideProps {
    isShowsSideBar: boolean;
    handleToggleSidebar: () => void;
}

export default function LeftSide({
    isShowsSideBar,
    handleToggleSidebar,
}: leftSideProps) {
    const navigate = useNavigate();
    const logOut = useUserStore((state) => state.logOut);
    const signOut = useUserStore((state) => state.signOut);
    const signUpName = useUserStore((state) => state.signUpName);
    const currentUserImg = useUserStore((state) => state.currentUserImg);
    const currentUserName = useUserStore((state) => state.currentUserName);
    const currentUserRole = useUserStore((state) => state.currentUserRole);
    const waitingMenus = useUserStore((state) => state.waitingMenus);
    const invitations = useUserStore((state) => state.invitations);
    const updateUserName = useUserStore((state) => state.updateUserName);
    const updateCoach = useUserStore((state) => state.updateCoach);
    const getCoachList = useUserStore((state) => state.getCoachList);
    const deleteInvitation = useUserStore((state) => state.deleteInvitation);
    const sendInvitationAtHome = useUserStore(
        (state) => state.sendInvitationAtHome
    );
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isMessageShow, setIsMessageShow] = useState(false);
    const messageCount = invitations.length + waitingMenus.length;
    const isOverSmallDevice = Boolean(window.innerWidth >= 640);
    const asideHide = isOverSmallDevice ? 'h-full' : 'h-[calc(100vh-44px)]';
    const pages = [
        {
            name: '我的首頁',
            path: '/',
            icon: HomeIcon,
        },
        {
            name: '健身菜單',
            path: '/training',
            icon: Task,
        },
        {
            name: '健身紀錄',
            path: '/record',
            icon: RecordIcon,
        },
        {
            name: 'InBody數據',
            path: '/inbody',
            icon: inBodyIcon,
        },
    ];
    useEffect(() => {
        getCoachList();
    }, [messageCount]);
    return (
        <aside
            className={`myBlack  absolute left-0 flex-shrink-0  z-50 ${
                isShowsSideBar ? 'block' : 'hidden'
            }  ${asideHide} w-[200px] pt-2 flex-col justify-center gap-4 sm:block`}
        >
            <div className=" flex w-full h-full flex-col">
                {isOverSmallDevice && (
                    <Logo
                        isShowsSideBar={isShowsSideBar}
                        handleToggleSidebar={handleToggleSidebar}
                    />
                )}

                <Avatar
                    isBordered
                    src={currentUserImg ? currentUserImg : ''}
                    color="warning"
                    size="lg"
                    className="m-auto mt-2 h-20 w-20 text-large flex-shrink-0"
                />
                <p className="m-auto mt-2 text-large font-bold">
                    {currentUserName} {currentUserRole === 1 ? '教練' : '學員'}
                </p>
                <Chip
                    className="m-auto cursor-pointer text-white"
                    size="sm"
                    radius="full"
                    variant="flat"
                    onClick={() => {
                        onOpen();
                    }}
                >
                    修改個人資料
                </Chip>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="bottom-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className=" flex flex-col gap-1 pb-1">
                                    修改使用者名稱
                                </ModalHeader>
                                <ModalBody>
                                    <InputText
                                        id="signUpName"
                                        type="text"
                                        label="姓名/暱稱"
                                        className={{
                                            input: ' text-black',
                                            label: 'text-black',
                                        }}
                                    />
                                    {signUpName}
                                    <Button
                                        size="sm"
                                        onClick={async () => {
                                            if (signUpName === '') {
                                                toast.error('請輸入名稱');
                                                return;
                                            }
                                            await updateUserName();

                                            onClose();
                                        }}
                                    >
                                        確認修改
                                    </Button>
                                </ModalBody>
                                {currentUserRole !== 1 && (
                                    <>
                                        <ModalHeader className=" flex flex-col gap-1 pb-1">
                                            申請教練
                                        </ModalHeader>
                                        <ModalBody>
                                            <SelectCoach />
                                            <Button
                                                size="sm"
                                                onClick={async () => {
                                                    await deleteInvitation();
                                                    await updateCoach();
                                                    sendInvitationAtHome();
                                                    onClose();
                                                }}
                                            >
                                                申請更換
                                            </Button>
                                        </ModalBody>
                                    </>
                                )}

                                <ModalFooter></ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <ul className="ml-5">
                    {pages.map((page) => {
                        return (
                            <div
                                key={page.name}
                                className="myDropdownItem pl-2 mt-3 mr-6 cursor-pointer text-white hover:border-l-2"
                                onClick={() => {
                                    navigate(page.path);
                                }}
                            >
                                <div className="myDropdownIcon">
                                    <img src={page.icon} />
                                </div>
                                <span className="pt-[4px] font-bold leading-none">
                                    {page.name}
                                </span>
                            </div>
                        );
                    })}
                    <div
                        className="myDropdownItem relative pl-2 mt-3 mr-6 cursor-pointer text-white hover:border-l-2"
                        onClick={() => {
                            setIsMessageShow(!isMessageShow);
                        }}
                    >
                        <div className="myDropdownIcon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                                />
                            </svg>
                        </div>
                        <span className="pt-[4px] leading-none font-bold items-center">
                            收件匣
                        </span>
                        <span
                            className={` ${
                                messageCount === 0 && `hidden`
                            } w-4 h-4 mt-1 text-center leading-tight text-xs rounded-full absolute right-3 bg-gray-300 text-black`}
                        >
                            {messageCount}
                        </span>

                        {isMessageShow && (
                            <Invitation messageCount={messageCount} />
                        )}
                    </div>
                </ul>

                <div className="flex flex-grow mx-10">
                    <div
                        className="self-end flex justify-between items-center px-3 border rounded-full text-center bg-gray-300  my-2 text-black w-full cursor-pointer"
                        onClick={async () => {
                            await signOut(auth);
                            logOut();
                            window.location.reload();
                        }}
                    >
                        <img className="w-6 h-6" src={LogOut} />
                        Log Out
                    </div>
                </div>
            </div>
        </aside>
    );
}
