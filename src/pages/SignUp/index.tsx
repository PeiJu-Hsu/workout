import { Radio, RadioGroup } from '@nextui-org/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ButtonBlack from '../../components/Button';
import { InputPassword, InputText } from '../../components/InputUnit';
import { auth, db } from '../../firebase';
import { useUserStore } from '../../stores/UserStore';
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
                            <Radio
                                classNames={{
                                    label:
                                        signUpRole === 1
                                            ? yellow
                                            : 'text-white',
                                }}
                                color="warning"
                                value="1"
                                onChange={(e) => {
                                    selectRole(Number(e.target.value));
                                }}
                            >
                                教練
                            </Radio>
                            <Radio
                                classNames={{
                                    label:
                                        signUpRole === 2
                                            ? yellow
                                            : 'text-white',
                                }}
                                color="warning"
                                value="2"
                                onChange={(e) => {
                                    selectRole(Number(e.target.value));
                                }}
                            >
                                學員
                            </Radio>
                        </RadioGroup>
                    </div>
                    {signUpRole === 1 ? (
                        <div className="flex flex-col gap-y-2">
                            <InputText
                                className={{
                                    label: 'text-white',
                                    input: 'text-white',
                                    description: 'text-white',
                                }}
                                id={'coachCalender'}
                                type={'url'}
                                label={'Google日曆 URL'}
                            />
                            <InputText
                                className={{
                                    label: 'text-white',
                                    input: 'text-white',
                                    description: 'text-white',
                                }}
                                id={'coachReserve'}
                                type={'url'}
                                label={'Google預約表 URL'}
                            />
                        </div>
                    ) : null}
                    {signUpRole === 2 ? (
                        <div className="mt-2">
                            <SelectCoach />
                        </div>
                    ) : null}

                    <div className="mt-4">
                        <ButtonBlack
                            size={'lg'}
                            radius={'full'}
                            variant={'solid'}
                            children={'註冊'}
                            onClick={async () => {
                                if (signUpRole === 1 && signUpName) {
                                    if (
                                        REGEX.test(coachCalender) &&
                                        REGEX.test(coachReserve)
                                    ) {
                                        await uploadImage(
                                            signUpImage,
                                            signUpEmail
                                        );
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
                                    } else {
                                        toast.error('請輸入正確的網址', {
                                            duration: 3000,
                                        });
                                        return;
                                    }
                                } else if (signUpRole === 2 && signUpName) {
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
                                } else {
                                    toast.error('請填寫完整資料');
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
