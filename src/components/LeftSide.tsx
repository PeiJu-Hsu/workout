import { Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../icons/home.png";
import RecordIcon from "../icons/records.png";
import Task from "../icons/task.png";
import { useUserStore } from "../stores/UserStore";
interface leftSideProps {
  isShowsSideBar: boolean;
}
export default function LeftSide({ isShowsSideBar }: leftSideProps) {
  const navigate = useNavigate();
  const currentUserImg = useUserStore((state) => state.currentUserImg);
  const currentUserName = useUserStore((state) => state.currentUserName);
  const currentUserRole = useUserStore((state) => state.currentUserRole);
  const pages = [
    {
      name: "Home",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Training",
      path: "/training",
      icon: Task,
    },
    {
      name: "Record",
      path: "/record",
      icon: RecordIcon,
    },
  ];
  return (
    <aside
      className={`myBlack absolute left-0 top-[44px] ${
        isShowsSideBar ? "block" : "hidden"
      }  h-[calc(100vh-44px)] w-[200px] flex-col justify-center gap-4  sm:block`}
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
        {pages.map((page) => {
          return (
            <div
              key={page.name}
              className="myDropdownItem mt-3 cursor-pointer text-white"
              onClick={() => {
                navigate(page.path);
              }}
            >
              <div className="myDropdownIcon">
                <img src={page.icon} />
              </div>
              <span className="pt-[4px] leading-none">{page.name}</span>
            </div>
          );
        })}
      </ul>
    </aside>
  );
}
