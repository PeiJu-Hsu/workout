import { Link } from '@nextui-org/react';
import WorkoutLogo from '../icons/WorkOut.png';
interface LogoProps {
    isShowsSideBar: boolean;
    handleToggleSidebar: () => void;
}
export default function Logo({
    isShowsSideBar,
    handleToggleSidebar,
}: LogoProps) {
    // const [isShowsSideBar, setIsShowsSideBar] = useState(false);
    const close = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            className="w-7 h-7 stroke-white"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );

    const menu = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            className="w-7 h-7 stroke-white"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
        </svg>
    );

    return (
        <div className=" flex justify-center items-center max-w-full">
            <div
                className="block w-7 sm:hidden"
                onClick={() => {
                    handleToggleSidebar();
                }}
            >
                {isShowsSideBar ? close : menu}
            </div>
            <img
                className=" ml-2 hidden w-7 h-7 sm:block"
                src={WorkoutLogo}
                alt="WorkOutLogo"
            />
            <Link href="/" aria-current="page" color="foreground">
                <p className="font ml-2 text-3xl font-bold text-inherit text-white">
                    WorkOut
                </p>
            </Link>
        </div>
    );
}
