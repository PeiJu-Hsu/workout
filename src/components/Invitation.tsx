import { Avatar, Button } from '@nextui-org/react';
import { useUserStore } from '../stores/UserStore';
interface InvitationProps {
    messageCount: number;
}
export default function Invitation({ messageCount }: InvitationProps) {
    const invitations = useUserStore((state) => state.invitations);
    const replyInvitation = useUserStore((state) => state.replyInvitation);
    return (
        <div className="ml-1 mt-1 p-2 border border-white rounded flex flex-col text-lg items-center gap-y-2">
            {messageCount ? '新的通知' : '沒有新的通知'}
            {invitations.map((invitation, index) => {
                return (
                    <div key={index} className="flex items-center gap-x-1">
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
        </div>
    );
}
