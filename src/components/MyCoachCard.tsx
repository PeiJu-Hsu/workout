import { Avatar } from "@nextui-org/react";
import { useUserStore } from "../stores/UserStore";
export default function MyCoachCard() {
  const myCoachName = useUserStore((state) => state.myCoachName);
  const signUpWithCoach = useUserStore((state) => state.signUpWithCoach);
  return (
    <>
      <p>My Coach</p>
      <div className=" my-1 flex items-center ">
        <Avatar isBordered color="default" size="sm" className="m-1" />
        <p className="mx-1">
          {signUpWithCoach.state === "accept"
            ? `${myCoachName} 教練`
            : signUpWithCoach.state === "waiting"
              ? "等待教練回覆"
              : signUpWithCoach.state === "reject"
                ? "教練拒絕"
                : "還沒有申請教練"}
        </p>
      </div>
    </>
  );
}
