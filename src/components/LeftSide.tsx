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
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { InputText } from '../components/InputUnit';
import HomeIcon from '../icons/home.png';
import RecordIcon from '../icons/records.png';
import Task from '../icons/task.png';
import SelectCoach from '../pages/SignUp/SelectCoach';
import { useUserStore } from '../stores/UserStore';
interface leftSideProps {
    isShowsSideBar: boolean;
}

export default function LeftSide({ isShowsSideBar }: leftSideProps) {
    const navigate = useNavigate();
    const signUpName = useUserStore((state) => state.signUpName);
    const currentUserImg = useUserStore((state) => state.currentUserImg);
    const currentUserName = useUserStore((state) => state.currentUserName);
    const currentUserRole = useUserStore((state) => state.currentUserRole);
    const updateUserName = useUserStore((state) => state.updateUserName);
    const updateCoach = useUserStore((state) => state.updateCoach);
    const getCoachList = useUserStore((state) => state.getCoachList);
    const deleteInvitation = useUserStore((state) => state.deleteInvitation);
    const sendInvitationAtHome = useUserStore((state) => state.sendInvitationAtHome);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const pages = [
        {
            name: 'Home',
            path: '/',
            icon: HomeIcon,
        },
        {
            name: 'Training',
            path: '/training',
            icon: Task,
        },
        {
            name: 'Record',
            path: '/record',
            icon: RecordIcon,
        },
    ];
    useEffect(() => {
        console.log('LeftSide');
        getCoachList();
    }, []);
    return (
        <aside
            className={`myBlack absolute left-0 top-[44px] z-50 ${
                isShowsSideBar ? 'block' : 'hidden'
            }  h-[calc(100vh-44px)] w-[200px] flex-col justify-center gap-4  sm:block`}
        >
            <div className=" mt-2 flex w-full flex-col">
                <Avatar
                    isBordered
                    src={currentUserImg ? currentUserImg : ''}
                    color="warning"
                    size="lg"
                    className="m-auto h-20 w-20 text-large"
                />
                <p className="m-auto mt-2 text-large font-bold">
                    {currentUserName} {currentUserRole === 1 ? '教練' : '學員'}
                </p>
                <Chip
                    className="m-auto text-white"
                    size="sm"
                    radius="full"
                    variant="flat"
                    onClick={() => {
                        onOpen();
                    }}
                >
                    修改個人資料
                </Chip>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className=" flex flex-col gap-1 pb-1">修改使用者名稱</ModalHeader>
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
                                {currentUserRole === 2 && (
                                    <>
                                        <ModalHeader className=" flex flex-col gap-1 pb-1">更換教練</ModalHeader>
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
            </div>

            <ul className=" ml-7">
                {pages.map((page) => {
                    return (
                        <div
                            key={page.name}
                            className="myDropdownItem mt-3 cursor-pointer text-white"
                            onClick={() => {
                                navigate(page.path);
                            }}
                        >
                            <div className="myDropdownIcon">
                                <img src={page.icon} />
                            </div>
                            <span className="pt-[4px] leading-none">{page.name}</span>
                        </div>
                    );
                })}
            </ul>
        </aside>
    );
}
