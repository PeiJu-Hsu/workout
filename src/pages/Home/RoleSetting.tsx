import {
    Button,
    Modal,
    ModalContent,
    Radio,
    RadioGroup,
    useDisclosure,
} from '@nextui-org/react';
import { InputText } from '../../components/InputUnit';
import { useUserStore } from '../../stores/UserStore';
import SelectCoach from '../SignUp/SelectCoach';

export default function RoleSetting() {
    const { onOpenChange } = useDisclosure();
    const currentUserRole = useUserStore((state) => state.currentUserRole);
    const updateCoachURL = useUserStore((state) => state.updateCoachURL);
    const updateCoach = useUserStore((state) => state.updateCoach);
    const updateRole = useUserStore((state) => state.updateRole);
    const sendInvitationAtHome = useUserStore(
        (state) => state.sendInvitationAtHome
    );
    const signUpRole = useUserStore((state) => state.signUpRole);
    const selectRole = useUserStore((state) => state.selectRole);

    return (
        <Modal
            isOpen={currentUserRole === 0}
            onOpenChange={onOpenChange}
            placement="bottom-center"
        >
            <ModalContent>
                {(onClose) => (
                    <div className="p-3">
                        <RadioGroup label="請選擇身分" orientation="horizontal">
                            <Radio
                                classNames={{
                                    label:
                                        signUpRole === 1
                                            ? 'yellow'
                                            : 'text-black',
                                }}
                                color="warning"
                                value="1"
                                onChange={(e) => {
                                    selectRole(Number(e.target.value));
                                }}
                            >
                                Coach
                            </Radio>
                            <Radio
                                classNames={{
                                    label:
                                        signUpRole === 2
                                            ? 'yellow'
                                            : 'text-black',
                                }}
                                color="warning"
                                value="2"
                                onChange={(e) => {
                                    selectRole(Number(e.target.value));
                                }}
                            >
                                Student
                            </Radio>
                        </RadioGroup>
                        {signUpRole === 1 ? (
                            <>
                                <InputText
                                    id={'coachCalender'}
                                    type={'url'}
                                    label={'CalenderURL'}
                                />
                                <InputText
                                    id={'coachReserve'}
                                    type={'url'}
                                    label={'ReserveURL'}
                                />
                                <Button
                                    size="sm"
                                    onClick={async () => {
                                        await updateCoachURL();
                                        onClose();
                                    }}
                                >
                                    完成
                                </Button>
                            </>
                        ) : null}
                        {signUpRole === 2 ? (
                            <div className="mt-2">
                                <SelectCoach />
                                <Button
                                    size="sm"
                                    onClick={async () => {
                                        await updateRole();
                                        await updateCoach();
                                        sendInvitationAtHome();
                                        onClose();
                                    }}
                                >
                                    完成
                                </Button>
                            </div>
                        ) : null}
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
}
