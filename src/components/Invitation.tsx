import { Avatar, Button } from "@nextui-org/react";
import { useUserStore } from "../stores/UserStore";
export default function MyCoachCard() {
  const invitations = useUserStore((state) => state.invitations);
  const replyInvitation = useUserStore((state) => state.replyInvitation);
  return (
    <>
      <p>New Invitation</p>
      {/* 這行放進map會有TS error */}
      {/* <DropdownItem className=" my-1 flex items-center gap-x-1 "> */}
      {invitations.map((invitation, index) => {
        return (
          <div className="my-2 mt-1 flex items-center gap-x-1">
            <Avatar isBordered color="default" size="sm" className="m-1" />
            <div className=" flex flex-col items-center gap-y-1">
              <p className=" text-sm" key={index}>
                {invitation.senderName}
                <span className=" text-xs">想成為你的學員</span>
              </p>
              <div className=" flex gap-x-1">
                <Button
                  className=" h-[16px] px-[6px] text-white"
                  radius="full"
                  size="sm"
                  color="success"
                  data-id={invitation.id}
                  onClick={(e) => {
                    replyInvitation(e, "accept");
                  }}
                >
                  Accept
                </Button>
                <Button
                  className=" h-[16px] "
                  radius="full"
                  size="sm"
                  color="danger"
                  data-id={invitation.id}
                  onClick={(e) => {
                    replyInvitation(e, "reject");
                  }}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      {/* </DropdownItem> */}
    </>
  );
}
