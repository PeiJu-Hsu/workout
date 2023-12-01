import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  CircularProgress,
} from "@nextui-org/react";
import { MenuStore } from "../../stores/MenuStore";
export default function ProgressCard({ itemPointer, runCount }) {
  const menuList = MenuStore((state) => state.menuList);
  const itemTargetCount =
    itemPointer < menuList.length
      ? menuList[itemPointer]?.records.length
      : menuList[itemPointer - 1]?.records.length;
  const progressValue = isNaN((100 * runCount) / itemTargetCount)
    ? 0
    : Math.round((100 * runCount) / itemTargetCount);
  return (
    <Card className="h-[240px] w-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
      <CardBody className="items-center justify-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={progressValue}
          strokeWidth={4}
          showValueLabel={true}
          label={itemTargetCount ? `${runCount}/${itemTargetCount}` : "0/0"}
        />
      </CardBody>
      <CardFooter className="items-center justify-center pt-0">
        {menuList[itemPointer]?.itemName ? (
          <Chip
            classNames={{
              base: "border-1 border-white/30",
              content: "text-white/90 text-small font-semibold",
            }}
            variant="bordered"
          >
            {menuList[itemPointer]?.itemName}
          </Chip>
        ) : null}

        {menuList[itemPointer + 1]?.itemName ? (
          <Chip
            classNames={{
              base: "border-1 border-white/30",
              content: "text-white/90 text-small font-semibold",
            }}
            variant="bordered"
          >
            {menuList[itemPointer + 1]?.itemName}
          </Chip>
        ) : null}
      </CardFooter>
    </Card>
  );
}
