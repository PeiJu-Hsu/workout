import { Avatar } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import HomeIcon from '../icons/home.png';
import inBodyIcon from '../icons/inbody.png';
import LogOut from '../icons/logout.png';
import RecordIcon from '../icons/records.png';
import Task from '../icons/task.png';
import { useUserStore } from '../stores/UserStore';
import EditProfile from './EditProfile';
import Invitation from './Invitation';
import Logo from './Logo';
interface leftSideProps {
    isShowsSideBar: boolean;
    handleToggleSidebar: () => void;
}
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
export default function LeftSide({
    isShowsSideBar,
    handleToggleSidebar,
}: leftSideProps) {
    const {
        logOut,
        signOut,
        getCoachList,
        currentUserImg,
        currentUserName,
        currentUserRole,
        waitingMenus,
        invitations,
    } = useUserStore();
    const navigate = useNavigate();
    const [isMessageShow, setIsMessageShow] = useState(false);
    const messageCount = invitations.length + waitingMenus.length;
    const isOverSmallDevice = Boolean(window.innerWidth >= 640);
    const asideHide = isOverSmallDevice ? 'h-full' : 'h-[calc(100vh-44px)]';

    /*
     *functions for render
     */
    const renderPageList = () => {
        return (
            <ul className="ml-5">
                {pages.map((page) => {
                    return (
                        <div
                            key={page.name}
                            className={`myDropdownItem pl-2 mt-3 mr-6 cursor-pointer border-transparent border-l-2 text-white hover:border-white ${
                                window.location.pathname === page.path &&
                                `border-white`
                            }`}
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
                    className="myDropdownItem relative flex pl-2 mt-3 mr-6 cursor-pointer border-transparent border-l-2 text-white  hover:border-white"
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
        );
    };

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
                <p className="m-auto mt-2 text-large font-bold w-full truncate text-center">
                    {currentUserName} {currentUserRole === 1 ? '教練' : '學員'}
                </p>
                <EditProfile />
                {renderPageList()}
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
                        <p className="flex-grow pt-[4px] font-bold leading-none">
                            登出
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
