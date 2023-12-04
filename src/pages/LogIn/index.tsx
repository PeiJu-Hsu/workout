import toast from "react-hot-toast";
import ButtonBlack, { ButtonDefault } from "../../components/Button";
import { InputPassword, InputText } from "../../components/InputUnit";
import { auth, db, googleProvider } from "../../firebase";
import { useUserStore } from "../../stores/UserStore";
export default function LogIn() {
  const yellow = " text-[#F9C809]";
  const hoverYellow = " hover:text-[#F9C809]";
  const { signUpEmail, signUpPassword, getAuth, nativeLogin, googleLogin } =
    useUserStore();
  const handleLogin = async () => {
    if (signUpEmail && signUpPassword) {
      await nativeLogin(auth, signUpEmail, signUpPassword);
      await getAuth(auth, db);
    } else {
      toast.error("請填入登入Email&密碼");
    }
  };
  const handleGoogleLogin = async () => {
    await googleLogin(auth, googleProvider);
    await getAuth(auth, db);
  };
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat px-5 sm:px-0"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
      }}
    >
      <div className="flex w-full max-w-sm overflow-hidden rounded-lg border  shadow-lg backdrop-blur-sm lg:max-w-4xl">
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-center text-xl font-extrabold text-white">
            Welcome <strong className={`${yellow}`}>WorkOut</strong>
          </p>

          <div className="mt-4">
            <InputText id={"signUpEmail"} type={"email"} label={"Email"} />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <InputPassword id={"signUpPassword"} />
            <a
              href="#"
              className={`mt-2 w-full text-end text-xs text-gray-500 ${hoverYellow}`}
            >
              Forget Password?
            </a>
          </div>
          <div className="mt-8">
            <ButtonBlack
              size={"lg"}
              radius={"full"}
              variant={"solid"}
              children={"Log In"}
              onClick={handleLogin}
            />
          </div>
          <div className=" mt-4 flex items-center justify-center rounded-full text-white shadow-md hover:bg-gray-100">
            <div className="flex w-full justify-center">
              <ButtonDefault
                size={"lg"}
                radius={"full"}
                variant={"solid"}
                children={
                  <div className="flex w-full justify-center">
                    <div className="min-w-[30px]">
                      <svg className="h-6 w-6" viewBox="0 0 40 40">
                        <path
                          d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                          fill="#FFC107"
                        />
                        <path
                          d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                          fill="#FF3D00"
                        />
                        <path
                          d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                          fill="#4CAF50"
                        />
                        <path
                          d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                          fill="#1976D2"
                        />
                      </svg>
                    </div>
                    <span className="ml-2">Log in with Google</span>
                  </div>
                }
                onClick={handleGoogleLogin}
              />
            </div>
          </div>
          <div className="mt-4 flex w-full items-center text-center">
            <a
              href="/signup"
              className="w-full text-center text-xs capitalize text-white"
            >
              Don&apos;t have any account yet?
              <span className={`font-bold ${yellow}`}> Sign Up</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
