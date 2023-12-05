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
  const invitations = useUserStore((state) => state.invitations);
  const signUpWithCoach = useUserStore((state) => state.signUpWithCoach);
  const replyInvitation = useUserStore((state) => state.replyInvitation);
  const sendInvitationAtHome = useUserStore(
    (state) => state.sendInvitationAtHome,
  );

  useEffect(() => {
    getCurrentUserInfo();
    fetchInBodyData();
    sendInvitationAtHome();
  }, []);

  return (
    <div className=" ml-2 mr-2  box-border rounded-2xl border-4 border-yellow-400 bg-gray-100 sm:ml-[200px]">
      <div className="m-2 rounded-lg bg-white ">
        <ScoreChart />
      </div>
      <div className="m-2  bg-white ">
        <WeightChart />
      </div>

      <div style={{ display: `${currentUserRole === 1 ? "block" : "none"}` }}>
        等待回覆的學生邀請
        {invitations.map((invitation, index) => {
          return (
            <p key={index}>
              {invitation.senderName} 申請成為您的學員{" "}
              <button
                data-id={invitation.id}
                onClick={(e) => {
                  replyInvitation(e, "accept");
                }}
              >
                Accept
              </button>
              <button
                data-id={invitation.id}
                onClick={(e) => {
                  replyInvitation(e, "reject");
                }}
              >
                Reject
              </button>
            </p>
          );
        })}
      </div>

      {/* <div>
        {calenderURL ? (
          <>
            <iframe
              src={calenderURL}
              style={{
                width: "70%",
                height: "600px",
              }}
            ></iframe>
            <iframe
              src={reserveURL}
              style={{
                width: "70%",
                height: "600px",
              }}
            ></iframe>
          </>
        ) : signUpWithCoach.state === "waiting" ? (
          <h1>等待教練回覆</h1>
        ) : signUpWithCoach.state === "reject" ? (
          <h1>被教練拒絕</h1>
        ) : (
          <h1>還沒有教練</h1>
        )}
      </div> */}
      <div>
        {calenderURL && currentUserRole === 1 ? (
          <iframe
            src={calenderURL}
            style={{
              width: "70%",
              height: "600px",
            }}
          ></iframe>
        ) : reserveURL && currentUserRole === 2 ? (
          <iframe
            src={reserveURL}
            style={{
              width: "70%",
              height: "600px",
            }}
          ></iframe>
        ) : signUpWithCoach.state === "waiting" ? (
          <h1>等待教練回覆</h1>
        ) : signUpWithCoach.state === "reject" ? (
          <h1>被教練拒絕</h1>
        ) : (
          <h1>還沒有教練</h1>
        )}
      </div>
      <div></div>
    </div>
  );
}
