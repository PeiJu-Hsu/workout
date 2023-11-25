import { useEffect } from "react";
import { ScoreChart } from "../../charts/ScoreChart";
import { WeightChart } from "../../charts/WeightChart";
import { InBodyStore } from "../../stores/InBodyStore";
import { useUserStore } from "../../stores/UserStore";
export default function Home() {
  const fetchInBodyData = InBodyStore((state) => state.fetchInBodyData);
  const currentUserName = useUserStore((state) => state.currentUserName);
  const currentUserEmail = useUserStore((state) => state.currentUserEmail);
  const currentUserRole = useUserStore((state) => state.currentUserRole);
  const calenderURL = useUserStore((state) => state.calenderURL);
  const reserveURL = useUserStore((state) => state.reserveURL);
  const getCurrentUserInfo = useUserStore((state) => state.getCurrentUserInfo);
  const sendInvitation = useUserStore((state) => state.sendInvitation);
  const myCoach = useUserStore((state) => state.myCoach);
  const invitations = useUserStore((state) => state.invitations);
  const signUpWithCoach = useUserStore((state) => state.signUpWithCoach);
  const replyInvitation = useUserStore((state) => state.replyInvitation);
  getCurrentUserInfo();
  fetchInBodyData();
  useEffect(() => {
    sendInvitation(myCoach, window.localStorage.getItem("UID")!);
  }, [myCoach]);
  // async () => {
  //   await getCurrentUserInfo();
  //   await fetchInBodyData();
  //   await sendInvitation(myCoach, window.localStorage.getItem("UID")!);
  // };

  return (
    <>
      <h1>
        Hi {currentUserName ? currentUserName : currentUserEmail}{" "}
        {currentUserRole === 1 ? "教練" : "學員"}
      </h1>
      <div style={{ display: "flex" }}>
        <ScoreChart />
        <WeightChart />
      </div>
      <div style={{ display: `${currentUserRole === 1 ? "block" : "none"}` }}>
        只有教練看得到
        {invitations.map((invitation) => {
          return (
            <p>
              form: {invitation.id} status: {invitation.state}{" "}
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

      <div>
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
      </div>
      <div></div>
    </>
  );
}
