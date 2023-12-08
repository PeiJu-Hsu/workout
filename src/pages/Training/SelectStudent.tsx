import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { useUserStore } from "../../stores/UserStore";

export default function SelectCoach() {
  const coachList = useUserStore((state) => state.coachList);
  const setSignUpCoach = useUserStore((state) => state.setSignUpCoach);
  return (
    <Select
      items={coachList}
      aria-label="Select a coach"
      placeholder="Select a coach"
      id=""
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger: "h-12",
      }}
      onChange={(e) => {
        setSignUpCoach(e.target.value);
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Avatar
              alt={item.data!.name}
              className="flex-shrink-0"
              size="sm"
              src={item.data!.userImage}
            />
            <div className="flex flex-col">
              <span>{item.data!.name}</span>
              <span className="text-tiny text-default-500">
                ({item.data!.email})
              </span>
            </div>
          </div>
        ));
      }}
    >
      {(coachList) => (
        <SelectItem
          key={coachList.id}
          textValue={coachList.name}
          value={coachList.id}
        >
          <div className="flex items-center gap-2">
            <Avatar
              alt={coachList.name}
              className="flex-shrink-0"
              size="sm"
              src={coachList.userImage}
            />
            <div className="flex flex-col">
              <span className="text-small">{coachList.name}</span>
              <span className="text-tiny text-default-400">
                {coachList.email}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
