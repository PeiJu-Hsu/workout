import { Card, CardBody, CircularProgress } from "@nextui-org/react";
import { MenuStore } from "../../stores/MenuStore";
interface PropsType {
  itemPointer: number;
  runCount: number;
}

export default function ProgressCard({ itemPointer, runCount }: PropsType) {
  const menuList = MenuStore((state) => state.menuList);
  const itemTargetCount =
    itemPointer < menuList.length
      ? menuList[itemPointer]?.records.length
      : menuList[itemPointer - 1]?.records.length;
  const progressValue = isNaN((100 * runCount) / itemTargetCount)
    ? 0
    : Math.round((100 * runCount) / itemTargetCount);
  return (
    <Card className="h-full w-full border-none bg-gradient-to-br from-gray-300 to-gray-500">
      <CardBody className="items-center justify-center pb-0">
        <CircularProgress
          classNames={{
            svg: " max-w-full min-w-16 w-20 h-full  drop-shadow-md sm:w-28  md:w-36 ",
            indicator: "stroke-white",
            track: "stroke-gray-200/20 dark:stroke-gray-500",
            value: "text-xl font-semibold text-white sm:text-3xl",
            label: "text-white/90 text-small",
          }}
          value={progressValue}
          strokeWidth={4}
          showValueLabel={true}
          label={itemTargetCount ? `${runCount}/${itemTargetCount}` : "0/0"}
        />
      </CardBody>
      {/* <CardFooter className="flex flex-col items-center justify-between gap-1 pt-0">
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
        <Chip >
          {itemTargetCount ? `${runCount}/${itemTargetCount}` : "0/0"}
        </Chip>

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
      </CardFooter> */}
    </Card>
  );
}
