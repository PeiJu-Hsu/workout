import { useEffect } from "react";
import { ScoreChart } from "../../charts/ScoreChatr";
import { WeightChart } from "../../charts/WeightChart";
import { InBodyStore } from "../../stores/InBodyStore";
import { useUserStore } from "../../stores/UserStore";
export default function Home() {
  const weight = InBodyStore((state) => state.weight);
  const fetchInBodyData = InBodyStore((state) => state.fetchInBodyData);

  const currentUserName = useUserStore((state) => state.currentUserName);
  const currentUserEmail = useUserStore((state) => state.currentUserEmail);
  const currentUserRole = useUserStore((state) => state.currentUserRole);
  const getCurrentUserInfo = useUserStore((state) => state.getCurrentUserInfo);

  useEffect(() => {
    getCurrentUserInfo();
    fetchInBodyData();
  });
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

      <p>{weight}</p>
      <div style={{ display: `${currentUserRole === 1 ? "block" : "none"}` }}>
        只有教練看得到
      </div>

      <div>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=j40024%40gmail.com&ctz=Asia%2FTaipei"
          style={{
            width: "70%",
            height: "600px",
          }}
        ></iframe>
        <iframe
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1Muh506OVhWdC9eeu8y0o48ce_XXkYTZC9S5ircTtWKJabti9RqylnpD5lCKZC_lOBIJDFhldS?gv=true"
          style={{
            width: "70%",
            height: "600px",
          }}
        ></iframe>
      </div>
      <div></div>
    </>
  );
}
