import { useEffect, useState } from "react";
import { MenuStore } from "../../stores/MenuStore";
import Menu from "./Menu";
import ProgressCard from "./ProgressCard";

export default function Training() {
  const menuList = MenuStore((state) => state.menuList);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [itemPointer, setItemPointer] = useState(0);
  const [runCount, setRunCount] = useState(0);
  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);

      if (runCount >= menuList[itemPointer]?.records.length - 1) {
        if (itemPointer === menuList.length - 1) {
          setRunCount(runCount + 1);
          setItemPointer(itemPointer + 1);
          return;
        }
        setRunCount(0);
        setItemPointer(itemPointer + 1);
      } else {
        setRunCount(runCount + 1);
      }
    } else {
      setTime(0);
      setIsRunning(true);
    }
  };
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const formattedMilliseconds = String(milliseconds % 1000).padStart(3, "0");

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    const clock = {
      min: formattedMinutes,
      sec: formattedSeconds,
      milliseconds: formattedMilliseconds,
    };
    return clock;
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  return (
    <div className="myPageContainer">
      <div className="myPageInnerPadding">
        <div className="flex  w-screen items-center justify-center bg-[#254E58]">
          <div className="mx-3 flex flex-col justify-center gap-6 rounded-md p-4 shadow-[5px_5px_50px_rgba(47,46,60,1)] sm:p-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-center text-xl font-semibold leading-8 text-[#FBFAF8] sm:text-3xl">
                Hurry, Limited Availability
              </h1>
              <span className="text-center text-sm font-semibold leading-8 text-[#959AAE]">
                <button onClick={handleStartStop}>
                  {isRunning ? "Stop" : "Start"}
                </button>
                <br />
                itemPointer: {itemPointer}, runCount: {runCount}
              </span>
            </div>
            <div className="flex justify-between sm:px-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <span className="rounded-md bg-[#88BDBC] px-3 py-3 text-3xl font-semibold text-[#112D32]">
                  {formatTime(time).min}
                </span>
                <span className="text-sm font-bold text-[#FBFAF8]">
                  {formatTime(time).min === "01" ? "Minute" : "Minutes"}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <span className="rounded-md bg-[#88BDBC] px-3 py-3 text-3xl font-semibold text-[#112D32]">
                  {formatTime(time).sec}
                </span>
                <span className="text-sm font-bold text-[#FBFAF8]">
                  {formatTime(time).sec === "01" ? "Second" : "Seconds"}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <span className="rounded-md bg-[#88BDBC] px-3 py-3 text-3xl font-semibold text-[#112D32]">
                  {formatTime(time).milliseconds.substring(0, 2)}
                </span>
                <span className="text-sm font-bold text-[#FBFAF8]">
                  {"milliseconds"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <ProgressCard itemPointer={itemPointer} runCount={runCount} />
        <Menu itemPointer={itemPointer} />
      </div>
    </div>
  );
}
