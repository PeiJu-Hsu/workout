import { Avatar, Button } from '@nextui-org/react';
import ReceivedMenu from '../pages/Training/ReceivedMenu';
import { useUserStore } from '../stores/UserStore';
interface InvitationProps {
    messageCount: number;
}
export default function Invitation({ messageCount }: InvitationProps) {
    const currentUserRole = useUserStore((state) => state.currentUserRole);
    const invitations = useUserStore((state) => state.invitations);
    const replyInvitation = useUserStore((state) => state.replyInvitation);
    return (
        <div className="p-2 border border-white rounded flex flex-col text-lg items-center gap-y-2 font-bold absolute -left-4 bottom-8  bg-black w-[194px]">
            {messageCount ? '新的訊息' : '沒有新的通知'}
            {currentUserRole === 1 ? (
                <>
                    {invitations.map((invitation, index) => {
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-x-1"
                            >
                                <Avatar
                                    isBordered
                                    color="default"
                                    size="sm"
                                    className="m-1"
                                />
                                <div className=" flex flex-col gap-y-1">
                                    <p className=" text-sm">
                                        {invitation.senderName}
                                        {/* <span className=" text-xs">想成為你的學員</span> */}
                                    </p>
                                    <div className="flex gap-x-1">
                                        <Button
                                            className=" h-[16px] px-[6px] text-white"
                                            radius="full"
                                            size="sm"
                                            color="success"
                                            data-id={invitation.id}
                                            onClick={(e) => {
                                                replyInvitation(e, 'accept');
                                            }}
                                        >
                                            接受
                                        </Button>
                                        <Button
                                            className=" h-[16px] "
                                            radius="full"
                                            size="sm"
                                            color="danger"
                                            data-id={invitation.id}
                                            onClick={(e) => {
                                                replyInvitation(e, 'reject');
                                            }}
                                        >
                                            拒絕
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <ReceivedMenu />
            )}
        </div>
    );
}
