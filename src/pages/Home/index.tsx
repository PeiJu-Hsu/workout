import { useEffect } from "react";
import { ScoreChart } from "../../charts/ScoreChart";
import { WeightChart } from "../../charts/WeightChart";
import { InBodyStore } from "../../stores/InBodyStore";
import { useUserStore } from "../../stores/UserStore";
export default function Home() {
  const fetchInBodyData = InBodyStore((state) => state.fetchInBodyData);
  const currentUserRole = useUserStore((state) => state.currentUserRole);
  const calenderURL = useUserStore((state) => state.calenderURL);
  const reserveURL = useUserStore((state) => state.reserveURL);
  const getCurrentUserInfo = useUserStore((state) => state.getCurrentUserInfo);
  const sendInvitationAtHome = useUserStore(
    (state) => state.sendInvitationAtHome,
  );

  useEffect(() => {
    getCurrentUserInfo();
    fetchInBodyData();
    sendInvitationAtHome();
  }, []);

  return (
    // <div className=" ml-2 mr-2  box-border rounded-2xl border-5 border-yellow-400 bg-gray-100 sm:ml-[205px]">
    <div className=" myPageContainer">
      <div className="myChartBoard">
        <ScoreChart />
        <WeightChart />
      </div>
      <div className="m-2  bg-white "></div>
      <div className="myChartBoard">
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
        ) : (
          <h1>還沒有教練</h1>
        )}
      </div>
      <div></div>
    </div>
  );
}
