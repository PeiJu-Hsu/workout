import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { useUserStore } from "../../stores/UserStore";

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
    email: "kristen.cooper@example.com",
  },
];

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
type User = {
  coachCalender: string;
  coachReserve: string;
  email: string;
  id: string;
  myCoach: { state: string; coachId: string };
  name: string;
  role: number;
  userImage: string;
};

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
              alt={item.data.name}
              className="flex-shrink-0"
              size="sm"
              src={item.data.userImage}
            />
            <div className="flex flex-col">
              <span>{item.data.name}</span>
              <span className="text-tiny text-default-500">
                ({item.data.email})
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
