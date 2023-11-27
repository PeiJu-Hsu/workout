import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useUserStore } from "../stores/UserStore";
export default function NavBar() {
  const navigate = useNavigate();
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
  return (
    <Navbar>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <Link href="/" aria-current="page" color="foreground">
          <p className="font-bold text-inherit">WorkOut</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="secondary" href="/training">
            Training
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/record" color="secondary">
            Record
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Button
          color="default"
          onClick={async () => {
            await signOut(auth);
            logOut();
          }}
        >
          <i className="fas fa-arrow-right-from-bracket"></i>
        </Button>
        <Button color="default">
          <i className="fas fa-bell">
            <span className="badge rounded-pill badge-notification bg-danger">
              {calculateTotalMessage() !== 0 ? calculateTotalMessage() : null}
            </span>
          </i>
        </Button>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar isBordered />
            {/* <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={
                currentUserImg
                  ? currentUserImg
                  : `https://i.pravatar.cc/150?u=${localStorage.getItem("UID")}`
              }
            /> */}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">
                Hi {currentUserName}
                {currentUserRole === 1 ? "教練" : "學員"}
              </p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="Inbody">
              <Link href="/inbody" color="secondary">
                Update InBody
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
