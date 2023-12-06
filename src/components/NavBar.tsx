import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { useState } from "react";
import { auth } from "../firebase";
import WorkoutLogo from "../icons/WorkOut.png";
import Bell from "../icons/bell.png";
import Close from "../icons/close.png";
import HomeIcon from "../icons/home.png";
import LogOut from "../icons/logout.png";
import MenuImg from "../icons/menu.png";
import ProfileIcon from "../icons/profile.png";
import RecordIcon from "../icons/records.png";
import Setting from "../icons/settings.png";
import Task from "../icons/task.png";
import InBody from "../icons/weighing-scale.png";
import { useUserStore } from "../stores/UserStore";
import MyCoachCard from "./MyCoachCard";
export default function NavBar() {
  const currentUserImg = useUserStore((state) => state.currentUserImg);
  const currentUserRole = useUserStore((state) => state.currentUserRole);
  const logOut = useUserStore((state) => state.logOut);
  const signOut = useUserStore((state) => state.signOut);
  const waitingMenus = useUserStore((state) => state.waitingMenus);
  const invitations = useUserStore((state) => state.invitations);
  const currentUserName = useUserStore((state) => state.currentUserName);
  const calculateTotalMessage = () => {
    const result = invitations.length + waitingMenus.length;
    return result;
  };
  const [isShowsSideBar, setIsShowsSideBar] = useState(false);
  return (
    //nav & header
    <Navbar className="myBlack  h-11 max-w-full">
      <NavbarBrand className="myBlack  h-11 max-w-full">
        <div className="relative flex max-w-full">
          <img
            className="block w-7 sm:hidden"
            src={isShowsSideBar ? Close : MenuImg}
            onClick={() => {
              setIsShowsSideBar(!isShowsSideBar);
            }}
            alt=""
          />
          <img
            className=" ml-2 hidden w-7 sm:block"
            src={WorkoutLogo}
            alt="WorkOutLogo"
          />
          <Link href="/" aria-current="page" color="foreground">
            <p className="font ml-2 text-xl  font-bold text-inherit text-white">
              WorkOut
            </p>
          </Link>
        </div>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="h-7">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <img className=" h-2/3 w-2/3" src={Bell} />
              <span className="badge rounded-pill badge-notification absolute -right-1 top-0 rounded-bl-full border bg-gray-300 text-black">
                {calculateTotalMessage() !== 0 ? calculateTotalMessage() : null}
              </span>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Message Actions" variant="flat">
            <DropdownItem key="myCoach" textValue="myCoach">
              {currentUserRole === 2 ? <MyCoachCard /> : null}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="h-7">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 ">
              <img className=" h-2/3 w-2/3" src={Setting} />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" textValue="profile">
              <div className="myDropdownItem ">
                <div className="myDropdownIcon">
                  <img src={ProfileIcon} />
                </div>
                <Link className="text-base text-black" href="/profile">
                  Profile
                </Link>
              </div>
            </DropdownItem>
            <DropdownItem key="Inbody" textValue="Inbody">
              <div className="myDropdownItem ">
                <div className="myDropdownIcon">
                  <img src={InBody} />
                </div>
                <Link className="text-base text-black" href="/inbody">
                  InBody
                </Link>
              </div>
            </DropdownItem>
            <DropdownItem key="logOut" textValue="logOut">
              <div
                className="myDropdownItem "
                onClick={async () => {
                  await signOut(auth);
                  logOut();
                }}
              >
                <div className="myDropdownIcon">
                  <img src={LogOut} />
                </div>

                <Link className="text-base text-black">Log out</Link>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <aside
        className={`myBlack  absolute left-0 top-[53px] ${
          isShowsSideBar ? "block" : "hidden"
        }  h-[calc(100vh-0px)] w-[200px] flex-col justify-center gap-4  sm:block`}
      >
        <div className=" mt-2 flex w-full flex-col">
          <Avatar
            isBordered
            src={currentUserImg ? currentUserImg : ""}
            color="warning"
            size="lg"
            className="m-auto h-20 w-20 text-large"
          />
          <p className="m-auto mt-2 text-large font-bold">
            {currentUserName} {currentUserRole === 1 ? "教練" : "學員"}
          </p>
        </div>

        <ul className=" ml-7">
          <a className=" text-white" href="/">
            <div className="myDropdownItem mt-3">
              <div className="myDropdownIcon">
                <img src={HomeIcon} />
              </div>
              <span className="pt-[4px] leading-none">Home</span>
            </div>
          </a>
          <a className=" text-white" href="/training">
            <div className="myDropdownItem mt-3">
              <div className="myDropdownIcon">
                <img src={Task} />
              </div>
              <span className="pt-[4px] leading-none">Training</span>
            </div>
          </a>
          <a className=" text-white" href="/record">
            <div className="myDropdownItem mt-3">
              <div className="myDropdownIcon">
                <img src={RecordIcon} />
              </div>
              <span className="pt-[6px] leading-none">Record</span>
            </div>
          </a>
        </ul>
      </aside>
    </Navbar>
  );
}
