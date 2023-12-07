import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Start from "../../icons/start.png";
import Stop from "../../icons/stop.png";
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
    <>
      <Card
        isBlurred
        className=" m-auto max-w-xl border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-12 items-center justify-center gap-6 ">
            <div className="relative col-span-4 flex h-full items-center justify-center object-contain">
              <ProgressCard itemPointer={itemPointer} runCount={runCount} />
            </div>
            <div className="col-span-8 flex flex-col gap-y-2">
              <div className="mb- flex items-start justify-between">
                <div className="flex flex-col gap-0">
                  <h1 className="text-xl font-semibold text-foreground/90">
                    {menuList[itemPointer]?.itemName}
                  </h1>
                  <p className="text-small font-semibold text-foreground/80 text-gray-400">
                    {menuList[itemPointer + 1]?.itemName
                      ? menuList[itemPointer + 1]?.itemName
                      : `🎉即將結束🎉`}
                  </p>
                  {/* <h1 className="mt-2 text-large font-medium">
                    Frontend Radio
                  </h1> */}
                </div>
                <div className="mx-2 flex items-center justify-center">
                  <img
                    className=" w-11"
                    onClick={handleStartStop}
                    src={isRunning ? Stop : Start}
                  />
                </div>
              </div>
              <div className="item-center flex justify-between">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="rounded-md bg-gray-300 px-3 py-3 text-xl font-semibold text-black sm:text-3xl">
                    {formatTime(time).min}
                  </span>
                  <span className="text-sm font-bold leading-none text-gray-400">
                    {formatTime(time).min === "01" ? "min" : "mins"}
                  </span>
                </div>
                <p className="-translate-y-3 self-center text-xl font-semibold text-black sm:text-3xl">
                  {" "}
                  :{" "}
                </p>
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="rounded-md bg-gray-300 px-3 py-3 text-xl font-semibold text-black sm:text-3xl">
                    {formatTime(time).sec}
                  </span>
                  <span className="text-sm font-bold leading-none text-gray-400">
                    {formatTime(time).sec === "01" ? "sec" : "secs"}
                  </span>
                </div>
                <p className="-translate-y-3 self-center text-xl font-semibold text-black sm:text-3xl">
                  {" "}
                  :{" "}
                </p>
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="rounded-md bg-gray-300 px-3 py-3 text-xl font-semibold text-black sm:text-3xl">
                    {formatTime(time).milliseconds.substring(0, 2)}
                  </span>
                  <span className="text-sm font-bold leading-none text-gray-400">
                    {"msecs"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Menu itemPointer={itemPointer} />
    </>
  );
}
// {menuList[itemPointer]?.itemName ? (
//   <Chip
//     classNames={{
//       base: "border-1 border-white/30",
//       content: "text-white/90 text-small font-semibold",
//     }}
//     variant="bordered"
//   >
//     {menuList[itemPointer]?.itemName}
//   </Chip>
// ) : null}
// <Chip >
//   {itemTargetCount ? `${runCount}/${itemTargetCount}` : "0/0"}
// </Chip>

// {menuList[itemPointer + 1]?.itemName ? (
//   <Chip
//     classNames={{
//       base: "border-1 border-white/30",
//       content: "text-white/90 text-small font-semibold",
//     }}
//     variant="bordered"
//   >
//     {menuList[itemPointer + 1]?.itemName}
//   </Chip>
// ) : null}
