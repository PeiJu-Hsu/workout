import { Radio, RadioGroup } from '@nextui-org/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import ButtonBlack from '../../components/Button';
import { InputPassword, InputText } from '../../components/InputUnit';
import { auth, db } from '../../firebase';
import { useUserStore } from '../../stores/UserStore';
import SelectCoach from './SelectCoach';
export default function LogIn() {
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

    useEffect(() => {
        console.log('signUp');
        getCoachList();
    }, []);
    return (
        <div
            className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat px-5 sm:px-0"
            style={{
                backgroundImage: `url(https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            }}
        >
            <div className="flex w-full max-w-sm overflow-hidden rounded-lg border  shadow-lg backdrop-blur-sm lg:max-w-4xl">
                <div className="md:block lg:w-1/2"></div>
                <div className="w-full p-8 lg:w-1/2">
                    <p className="text-center text-xl font-extrabold text-white">
                        Join <strong className={`${yellow}`}>WorkOut</strong>
                    </p>
                    <p className="w-full text-center text-xs capitalize text-white">
                        Get started with your free account
                    </p>
                    <div className="mt-2">
                        <InputText
                            className={{
                                input: ' text-white',
                                label: 'text-white',
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
                                input: ' text-white',
                                label: 'text-white',
                            }}
                            id={'signUpName'}
                            type={'text'}
                            label={'Name'}
                        />
                    </div>
                    {/* <div className="mt-2">
            <InputFile id={"signUpImage"} />
          </div> */}
                    <div className="mt-3 ">
                        <RadioGroup
                            classNames={{
                                label: 'text-white',
                            }}
                            label="Select your role"
                            orientation="horizontal"
                        >
                            <Radio
                                classNames={{
                                    label: signUpRole === 1 ? yellow : 'text-white',
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
                                    label: signUpRole === 2 ? yellow : 'text-white',
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
                    </div>
                    {signUpRole === 1 ? (
                        <>
                            <InputText
                                className={{
                                    input: ' text-white',
                                    label: 'text-white',
                                }}
                                id={'coachCalender'}
                                type={'url'}
                                label={'CalenderURL'}
                            />

                            <InputText
                                className={{
                                    input: ' text-white',
                                    label: 'text-white',
                                }}
                                id={'coachReserve'}
                                type={'url'}
                                label={'ReserveURL'}
                            />
                        </>
                    ) : null}
                    {signUpRole === 2 ? (
                        <div className="mt-2">
                            <SelectCoach />
                        </div>
                    ) : null}

                    <div className="mt-8">
                        <ButtonBlack
                            size={'lg'}
                            radius={'full'}
                            variant={'solid'}
                            children={'Sign Up'}
                            onClick={async () => {
                                if (signUpRole === 1 && signUpName && coachCalender && coachReserve) {
                                    await uploadImage(signUpImage, signUpEmail);
                                    await getUploadImage(signUpImage, signUpEmail);
                                    await signUp(auth, signUpEmail, signUpPassword);
                                    await getAuth(auth, db);
                                } else if (signUpRole === 2 && signUpName) {
                                    await uploadImage(signUpImage, signUpEmail);
                                    await getUploadImage(signUpImage, signUpEmail);
                                    await signUp(auth, signUpEmail, signUpPassword);
                                    await getAuth(auth, db);
                                } else {
                                    toast.error('請填寫完整資料');
                                }
                            }}
                        />
                    </div>
                    <div className=" mt-4 flex items-center justify-center rounded-full text-white shadow-md hover:bg-gray-100">
                        <div className="flex w-full justify-center"></div>
                    </div>
                    <div className="mt-4 flex w-full items-center text-center">
                        <a href="/login" className="w-full text-center text-xs capitalize text-white">
                            Already have an account?
                            <span className={`font-bold ${yellow}`}> Log in</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
