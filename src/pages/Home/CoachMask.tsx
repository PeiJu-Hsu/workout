import { Avatar, Chip } from '@nextui-org/react';
import { useUserStore } from '../../stores/UserStore';
export default function CoachMask() {
    const myCoachName = useUserStore((state) => state.myCoachName);
    const signUpWithCoach = useUserStore((state) => state.signUpWithCoach);
    const coachList = useUserStore((state) => state.coachList);
    const getMyCoachImg = () => {
        const myCoach = coachList.find((coach) => coach.name === myCoachName);
        if (!myCoach) return '';
        return myCoach.userImage;
    };
    return (
        <div className=" w-full text-center absolute -bottom-[150px]">
            <div className=" my-1 flex flex-col items-center ">
                <Avatar
                    isBordered
                    color="default"
                    size="lg"
                    className="m-2"
                    src={getMyCoachImg()}
                />
                <p className="mx-1">{myCoachName} 教練</p>
                <Chip className=" text-xs" color="default" size="sm">
                    {signUpWithCoach.state === 'waiting'
                        ? `等待回覆`
                        : signUpWithCoach.state === 'reject'
                          ? '教練婉拒'
                          : '還沒有申請教練'}
                </Chip>
            </div>
        </div>
    );
}
