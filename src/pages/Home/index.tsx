import { useEffect } from 'react';
import { ScoreChart } from '../../charts/ScoreChart';
import { WeightChart } from '../../charts/WeightChart';
import { InBodyStore } from '../../stores/InBodyStore';
import { useUserStore } from '../../stores/UserStore';
import CoachMask from './CoachMask';
import DirectToInbody from './DirectToInbody';
import ReserveArea from './ReserveArea';
import RoleSetting from './RoleSetting';

export default function Home() {
    const currentUserRole = useUserStore((state) => state.currentUserRole);
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
    const isInBodyMaskShow = Boolean(!InBodyCount);
    const isCoachMaskShow = Boolean(
        Number(currentUserRole) !== 1 && signUpWithCoach.state !== 'accept'
    );
    useEffect(() => {
        getCurrentUserInfo();
        fetchInBodyData();
        sendInvitationAtHome();
    }, []);

    return (
        <div className="relative">
            <div className={`myChartBoard ${isInBodyMaskShow && 'blur-sm'}`}>
                <ScoreChart />
                <WeightChart />
            </div>
            {isInBodyMaskShow && <DirectToInbody />}
            <RoleSetting />
            <div className={`myChartBoard ${isCoachMaskShow && 'blur-sm'}`}>
                <ReserveArea />
            </div>
            {isCoachMaskShow && <CoachMask />}
        </div>
    );
}
