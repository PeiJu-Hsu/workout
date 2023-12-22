import { Navbar, NavbarBrand } from '@nextui-org/react';
import { useState } from 'react';
import LeftSide from './LeftSide';
import Logo from './Logo';

export default function NavBar() {
    const [isShowsSideBar, setIsShowsSideBar] = useState(false);
    const handleToggleSidebar = () => {
        setIsShowsSideBar((prevState) => !prevState);
    };
    return (
        <>
            <Navbar className="myBlack relative h-11 max-w-full sm:hidden">
                <NavbarBrand className="myBlack  h-11 max-w-full">
                    <Logo
                        isShowsSideBar={isShowsSideBar}
                        handleToggleSidebar={handleToggleSidebar}
                    />
                </NavbarBrand>
            </Navbar>
            <LeftSide
                isShowsSideBar={isShowsSideBar}
                handleToggleSidebar={handleToggleSidebar}
            />
        </>
    );
}
