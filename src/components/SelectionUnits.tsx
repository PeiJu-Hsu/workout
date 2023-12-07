import { Select, SelectItem } from "@nextui-org/react";
import { MenuStore } from "../stores/MenuStore";
import { useUserStore } from "../stores/UserStore";
import { group, groupList } from "../utils/TrainingItems";

// interface GroupItemType {
//     sectionName: string;
//     sectionItems: string[];
//   }

// interface SelectMuscleType {
//     group: GroupItemType[];
//   }
export function SelectMuscle() {
  const setItemGroup = MenuStore((state) => state.setItemGroup);
  const setItemGroupIndex = MenuStore((state) => state.setItemGroupIndex);
  const setItemName = MenuStore((state) => state.setItemName);
  return (
    <Select
      isRequired
      label="Select a section"
      placeholder="Select a section"
      defaultSelectedKeys=""
      className="  max-w-xs"
      onChange={(e) => {
        setItemGroup(e.target.value);
        setItemGroupIndex(groupList.indexOf(e.target.value));
        setItemName("default");
      }}
    >
      {group.map((item) => (
        <SelectItem key={item.sectionName} value={item.sectionName}>
          {item.sectionName}
        </SelectItem>
      ))}
    </Select>
  );
}
export function SelectWorkOutItem() {
  const setItemName = MenuStore((state) => state.setItemName);
  const itemGroupIndex = MenuStore((state) => state.itemGroupIndex);
  return (
    <Select
      isRequired
      label="Select an item"
      placeholder="Select an item"
      defaultSelectedKeys=""
      className="max-w-xs"
      onChange={(e) => {
        setItemName(e.target.value);
      }}
    >
      {group[itemGroupIndex].sectionItems.map((item) => (
        <SelectItem key={item} value={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
}
export function SelectNumber({ max }: { max: number }) {
  const optionArray = new Array(max).fill(0).map((_item, index) => index + 1);
  const setRunCount = MenuStore((state) => state.setRunCount);
  return (
    <Select
      isRequired
      label="Set run count"
      placeholder="Set run count"
      defaultSelectedKeys=""
      className="max-w-xs"
      onChange={(e) => {
        setRunCount(Number(e.target.value));
      }}
    >
      {optionArray.map((item) => (
        <SelectItem className="text-black" key={item} value={item}>
          {item.toString()}
        </SelectItem>
      ))}
    </Select>
  );
}
export function SelectStudent() {
  const studentList = useUserStore((state) => state.studentList);
  const setTargetStudent = MenuStore((state) => state.setTargetStudent);
  return (
    <Select
      label="Choose a student"
      placeholder="Choose a student"
      defaultSelectedKeys=""
      className="  max-w-xs"
      onChange={(e) => {
        console.log(e.target.value);
        setTargetStudent(e.target.value);
      }}
    >
      {studentList.map((item) => (
        <SelectItem key={item.senderName} value={item.id}>
          {item.senderName}
        </SelectItem>
      ))}
    </Select>
  );
}
