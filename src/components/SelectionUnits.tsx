import { Button, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import SendIcon from "../icons/send.png";
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
      data-filled:after="OK"
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
export function SelectStudentReceiver() {
  const studentList = useUserStore((state) => state.studentList);
  const currentUserName = useUserStore((state) => state.currentUserName);
  // const setTargetStudent = MenuStore((state) => state.setTargetStudent);
  const sentToStudent = MenuStore((state) => state.sentToStudent);
  const [receiver, setReceiver] = useState("default");

  return (
    <>
      <Select
        label="Choose a student"
        placeholder="Choose a student"
        defaultSelectedKeys=""
        className="  max-w-xs"
        onChange={(e) => {
          console.log("123", e.target.value);
          // setTargetStudent(e.target.value);
          setReceiver(e.target.value);
        }}
      >
        {studentList.map((item) => (
          <SelectItem key={item.senderName} value={item.id}>
            {item.senderName}
          </SelectItem>
        ))}
      </Select>
      <div className=" flex justify-end">
        <Button
          className=" w-3/5 rounded-full bg-gray-400 text-lg text-white hover:bg-yellow-300"
          endContent={<img className=" h-2/3 w-2/3" src={SendIcon} />}
          onClick={async () => {
            sentToStudent(currentUserName, receiver);
            // toast.success("Menu sent");

            toast.success("已傳送");
          }}
        >
          Send to student
        </Button>
      </div>
    </>
  );
}
