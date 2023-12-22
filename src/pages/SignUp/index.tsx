import { Radio, RadioGroup } from '@nextui-org/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ButtonBlack from '../../components/Button';
import { InputPassword, InputText } from '../../components/InputUnit';
import { auth, db } from '../../firebase';
import { useUserStore } from '../../stores/UserStore';
import CoachURLInput from './CoachURLInput';
import SelectCoach from './SelectCoach';
export default function LogIn() {
    const navigate = useNavigate();
    const yellow = ' text-[#F9C809]';
    const {
        signUpRole,
        signUp,
        signUpEmail,
        signUpPassword,
        signUpName,
        signUpImage,
        selectRole,
        getCoachList,
        coachReserve,
        coachCalender,
        uploadImage,
        getAuth,
        getUploadImage,
    } = useUserStore();
    const REGEX = /^https:\/\/[^\s$.?#].[^\s]*$/;
    const validSignUpInfo = (signUpRole: number) => {
        if (!signUpName) {
            toast.error('請填寫姓名');
            return false;
        }
        if (signUpRole === 0) {
            toast.error('請選擇註冊身分');
            return false;
        }
        if (signUpRole === 2) return true;

        const isURLValid = Boolean(
            REGEX.test(coachCalender) && REGEX.test(coachReserve)
        );
        if (!isURLValid) {
            toast.error('請填寫正確的URL');
            return false;
        }
        return true;
    };
    const roles = ['教練', '學員'];

    useEffect(() => {
        getCoachList();
    }, []);
    return (
        <div
            className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat px-5 sm:px-0 "
            style={{
                backgroundImage: `url(https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg)`,
            }}
        >
            <div className="flex w-full max-w-sm overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm bg-gray-200/30">
                <div className="w-full p-4 ">
                    <p className="text-center text-xl font-extrabold text-white">
                        加入 <strong className={`${yellow}`}>WorkOut</strong>
                    </p>
                    <p className="w-full text-center text-xs capitalize text-white">
                        免費註冊
                    </p>
                    <div className="mt-2">
                        <InputText
                            className={{
                                label: 'text-white',
                                input: 'text-white',
                                description: 'text-white',
                            }}
                            id={'signUpEmail'}
                            type={'email'}
                            label={'Email'}
                        />
                    </div>
                    <div className="mt-2 flex flex-col justify-between">
                        <InputPassword id={'signUpPassword'} />
                    </div>
                    <div className="mt-2">
                        <InputText
                            className={{
                                label: 'text-white',
                                input: 'text-white',
                                description: 'text-white',
                            }}
                            id={'signUpName'}
                            type={'text'}
                            label={'Name'}
                        />
                    </div>
                    <div className="mt-3 ">
                        <RadioGroup
                            classNames={{
                                label: 'text-white',
                            }}
                            label="選擇註冊身分"
                            orientation="horizontal"
                        >
                            {roles.map((role, index) => (
                                <Radio
                                    key={role}
                                    classNames={{
                                        label: 'text-white',
                                    }}
                                    color="warning"
                                    value={(index + 1).toString()}
                                    onChange={(e) => {
                                        selectRole(Number(e.target.value));
                                    }}
                                >
                                    {role}
                                </Radio>
                            ))}
                        </RadioGroup>
                    </div>
                    {signUpRole === 1 ? <CoachURLInput /> : null}
                    {signUpRole === 2 ? <SelectCoach /> : null}
                    <div className="mt-4">
                        <ButtonBlack
                            size={'lg'}
                            radius={'full'}
                            variant={'solid'}
                            children={'註冊'}
                            onClick={async () => {
                                if (validSignUpInfo(signUpRole)) {
                                    await uploadImage(signUpImage, signUpEmail);
                                    await getUploadImage(
                                        signUpImage,
                                        signUpEmail
                                    );
                                    await signUp(
                                        auth,
                                        signUpEmail,
                                        signUpPassword
                                    );
                                    await getAuth(auth, db);
                                }
                            }}
                        />
                    </div>
                    <div className="mt-4 flex w-full items-center text-center">
                        <div
                            onClick={() => {
                                navigate('/login');
                            }}
                            className="w-full text-center text-xs capitalize text-white"
                        >
                            已經有帳號了嗎?
                            <span
                                className={`font-bold cursor-pointer ${yellow}`}
                            >
                                立即登入
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
