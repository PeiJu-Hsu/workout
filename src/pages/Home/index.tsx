import { Avatar, Button, Chip } from '@nextui-org/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScoreChart } from '../../charts/ScoreChart';
import { WeightChart } from '../../charts/WeightChart';
import { InBodyStore } from '../../stores/InBodyStore';
import { useUserStore } from '../../stores/UserStore';
export default function Home() {
    const navigate = useNavigate();
    const currentUserRole = useUserStore((state) => state.currentUserRole);
    const calenderURL = useUserStore((state) => state.calenderURL);
    const reserveURL = useUserStore((state) => state.reserveURL);
    const myCoachName = useUserStore((state) => state.myCoachName);
    const signUpWithCoach = useUserStore((state) => state.signUpWithCoach);
    const getCurrentUserInfo = useUserStore(
        (state) => state.getCurrentUserInfo
    );
    const sendInvitationAtHome = useUserStore(
        (state) => state.sendInvitationAtHome
    );
    const fetchInBodyData = InBodyStore((state) => state.fetchInBodyData);
    const InBodyHistory = InBodyStore((state) => state.InBodyHistory);
    const InBodyCount = InBodyHistory.length;
    // const InBodyCount = 0;
    const isInBodyMaskShow = Boolean(!InBodyCount);
    const isCoachMaskShow = Boolean(
        Number(currentUserRole) !== 1 && signUpWithCoach.state !== 'accept'
    );
    const directToInbody = (
        <div className=" w-full text-center absolute top-24">
            <h2 className="text-2xl font-bold mb-1">尚無InBody數據</h2>
            <Button
                className="block text-base font-semibold m-auto"
                color="default"
                variant="shadow"
                onClick={() => {
                    navigate('/inbody');
                }}
            >
                前往填寫
            </Button>
        </div>
    );
    const coachMask = (
        <div className=" w-full text-center absolute -bottom-[150px]">
            <div className=" my-1 flex flex-col items-center ">
                <Avatar isBordered color="default" size="lg" className="m-2" />
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
    useEffect(() => {
        getCurrentUserInfo();
        fetchInBodyData();
        sendInvitationAtHome();
    }, []);

    return (
        // <div className=" ml-2 mr-2  box-border rounded-2xl border-5 border-yellow-400 bg-gray-100 sm:ml-[205px]">
        // <div className=" myPageContainer">
        //   <div className="myPageInnerPadding">
        <div className="relative">
            <div className={`myChartBoard ${isInBodyMaskShow && 'blur-sm'}`}>
                <ScoreChart />
                <WeightChart />
            </div>
            {isInBodyMaskShow && directToInbody}

            <div className={`myChartBoard ${isCoachMaskShow && 'blur-sm'}`}>
                {calenderURL && currentUserRole === 1 ? (
                    <iframe
                        className="mt-2 h-[400px] w-full rounded-[10px] bg-white"
                        src={calenderURL}
                    ></iframe>
                ) : reserveURL && currentUserRole === 2 ? (
                    <iframe
                        className=" mt-2 h-[400px] w-full rounded-[10px] bg-white"
                        src={reserveURL}
                    ></iframe>
                ) : null}
            </div>
            {isCoachMaskShow && coachMask}
        </div>

        //   </div>
        // </div>
    );
}
