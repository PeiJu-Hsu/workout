import {
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
import LogOut from "../icons/logout.png";
import MenuImg from "../icons/menu.png";
import ProfileIcon from "../icons/profile.png";
import { useUserStore } from "../stores/UserStore";
import LeftSide from "./LeftSide";

import Setting from "../icons/settings.png";

import InBody from "../icons/weighing-scale.png";

import Invitation from "./Invitation";
import MyCoachCard from "./MyCoachCard";
export default function NavBar() {
  const [isShowsSideBar, setIsShowsSideBar] = useState(false);
  const currentUserRole = useUserStore((state) => state.currentUserRole);
  const logOut = useUserStore((state) => state.logOut);
  const signOut = useUserStore((state) => state.signOut);
  const waitingMenus = useUserStore((state) => state.waitingMenus);
  const invitations = useUserStore((state) => state.invitations);

  const calculateTotalMessage = () => {
    const result = invitations.length + waitingMenus.length;
    return result;
  };

  return (
    <>
      {/* //nav & header */}
      <Navbar className="myBlack relative h-11 max-w-full">
        <NavbarBrand className="myBlack  h-11 max-w-full">
          <div className=" flex max-w-full">
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
                  {calculateTotalMessage() !== 0
                    ? calculateTotalMessage()
                    : null}
                </span>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Message Actions" variant="flat">
              <DropdownItem key="myCoach" textValue="myCoach">
                {currentUserRole === 1 ? (
                  <Invitation />
                ) : currentUserRole === 2 ? (
                  <MyCoachCard />
                ) : null}
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
      </Navbar>
      <LeftSide isShowsSideBar={isShowsSideBar} />
    </>
  );
}
