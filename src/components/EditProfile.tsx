import {
    Button,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import toast from 'react-hot-toast';
import SelectCoach from '../pages/SignUp/SelectCoach';
import { useUserStore } from '../stores/UserStore';
import { InputText } from './InputUnit';

export default function EditProfile() {
    const {
        currentUserRole,
        signUpName,
        updateUserName,
        updateCoach,
        deleteInvitation,
        sendInvitationAtHome,
    } = useUserStore();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
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
                                        label: 'text-black',
                                        input: 'text-black',
                                        description: undefined,
                                    }}
                                />
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
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
