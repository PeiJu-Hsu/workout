import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { MenuStore } from "../../stores/MenuStore";
import { useUserStore } from "../../stores/UserStore";

// type User = {
//   id: number;
//   name: string;
//   role: string;
//   team: string;
//   status: string;
//   age: string;
//   avatar: string;
//   email: string;
// };

export default function SelectStudent() {
  const studentList = useUserStore((state) => state.studentList);
  const setTargetStudent = MenuStore((state) => state.setTargetStudent);
  return (
    <Select
      items={studentList}
      aria-label="Select a Student"
      placeholder="Select a Student"
      id=""
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger: "h-12",
      }}
      onChange={(e) => {
        setTargetStudent(e.target.value);
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Avatar
              alt={item.data!.senderName}
              className="flex-shrink-0"
              size="sm"
              src={item.data!.userImage}
            />
            <div className="flex flex-col">
              <span>{item.data!.senderName}</span>
              {/* <span className="text-tiny text-default-500">
                ({item.data!.email})
              </span> */}
            </div>
          </div>
        ));
      }}
    >
      {(StudentList) => (
        <SelectItem
          key={StudentList.id}
          textValue={StudentList.senderName}
          value={StudentList.id}
        >
          <div className="flex items-center gap-2">
            <Avatar
              alt={StudentList.senderName}
              className="flex-shrink-0"
              size="sm"
              src={StudentList?.userImage}
            />
            <div className="flex flex-col">
              <span className="text-small">{StudentList.senderName}</span>
              {/* <span className="text-tiny text-default-400">
                {coachList.email}
              </span> */}
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
