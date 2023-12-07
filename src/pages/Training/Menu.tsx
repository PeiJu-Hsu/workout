import {
  Accordion,
  AccordionItem,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { InputLoadingNumber } from "../../components/InputUnit";
import {
  SelectMuscle,
  SelectNumber,
  SelectStudent,
  SelectWorkOutItem,
} from "../../components/SelectionUnits";
import TrashCan from "../../icons/trash.png";
import { MenuStore } from "../../stores/MenuStore";
import { useUserStore } from "../../stores/UserStore";

interface PropsType {
  itemPointer: number;
}
export default function Menu({ itemPointer }: PropsType) {
  const {
    menuList,

    setTargetStudent,
    setMenuList,
    resetMenuList,
    addMenuRecord,
    targetStudent,
    clearMenuList,
    sentToStudent,
    deleteReceivedMenu,
  } = MenuStore();
  const getStudentList = useUserStore((state) => state.getStudentList);
  const currentUserName = useUserStore((state) => state.currentUserName);
  const currentUserRole = useUserStore((state) => state.currentUserRole);
  const studentList = useUserStore((state) => state.studentList);
  const waitingMenus = useUserStore((state) => state.waitingMenus);

  function changeItemRecord(
    objIndex: number,
    itemIndex: number,
    itemQuantity: string,
  ) {
    const newItemRecord = menuList[objIndex].records.map((item, index) =>
      index === itemIndex ? Number(itemQuantity) : item,
    );
    const newMenuList = menuList.map((item, index) =>
      index === objIndex ? { ...item, records: newItemRecord } : item,
    );
    resetMenuList(newMenuList);
    console.log("newMenuList:", menuList);
  }

  useEffect(() => {
    getStudentList();
  }, []);

  return (
    <div className="w-full">
      <SelectMuscle />
      <SelectWorkOutItem />
      <InputLoadingNumber
        id={"loading"}
        type={"number"}
        label={"target-load"}
      />

      <SelectNumber max={Number(5)} />
      <button
        type="button"
        style={{ backgroundColor: "black", color: "white" }}
        onClick={setMenuList}
      >
        新增項目
      </button>
      <Accordion variant="splitted">
        {waitingMenus.map((item, index) => {
          return (
            <AccordionItem
              key={index}
              style={{ backgroundColor: "gray", color: "Black" }}
              aria-label="Accordion 1"
              title={item.senderName}
            >
              {item.content.map((item: any, index: number) => {
                const objIndex = index;
                return (
                  <div key={index}>
                    {item.itemName}
                    {item.records.map((load: number, index: number) => {
                      return (
                        <input
                          key={index}
                          type="number"
                          defaultValue={load}
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            const value = target.value;
                            changeItemRecord(objIndex, index, value);
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
              <button
                id={index.toString()}
                type="button"
                style={{ backgroundColor: "gray", color: "Black" }}
                onClick={() => {
                  resetMenuList(waitingMenus[index].content);
                  deleteReceivedMenu(waitingMenus[index].id);
                }}
              >
                Yes
              </button>
              <button
                id={index.toString()}
                type="button"
                style={{ backgroundColor: "gray", color: "Black" }}
                onClick={() => {
                  deleteReceivedMenu(waitingMenus[index].id);
                }}
              >
                No
              </button>
            </AccordionItem>
          );
        })}
      </Accordion>

      <h2>Menu as below</h2>
      {currentUserRole === 1 ? (
        <>
          <button
            type="button"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={() => {
              sentToStudent(currentUserName);
            }}
          >
            sentToStudent
          </button>

          <select
            value={targetStudent}
            id="targetStudent"
            onChange={(e) => {
              console.log(e.target.value);
              setTargetStudent(e.target.value);
            }}
          >
            <option value={"default"} disabled>
              Choose a student
            </option>

            {studentList ? (
              studentList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.senderName}
                  </option>
                );
              })
            ) : (
              <option>No Student</option>
            )}
          </select>
          <SelectStudent />
        </>
      ) : null}
      <button
        type="button"
        style={{ backgroundColor: "black", color: "white", margin: "5px" }}
        onClick={clearMenuList}
      >
        Clear
      </button>
      {
        <Table
          classNames={{
            wrapper: ["h-full p-2"],
            th: [" text-center"],
            tr: [" text-center"],
          }}
          color="default"
          // selectionMode="multiple"
          // selectedKeys={selectedKeys}
          // onSelectionChange={setSelectedKeys}
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>
              <Checkbox defaultSelected color="default"></Checkbox>
            </TableColumn>
            <TableColumn>ITEM</TableColumn>
            <TableColumn>LOAD</TableColumn>
            <TableColumn>REMOVE</TableColumn>
          </TableHeader>
          {menuList.length === 0 ? (
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          ) : (
            <TableBody>
              {menuList.map((item, index) => {
                const objIndex = index;
                return (
                  <TableRow key={index.toString()} className="">
                    <TableCell>
                      <Checkbox
                        isSelected={itemPointer > index}
                        color="default"
                      ></Checkbox>
                    </TableCell>
                    <TableCell className=" min-w-[90px]">
                      {item.itemName}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col justify-start gap-x-1  md:flex-row">
                        {item.records.map((load, index) => {
                          return (
                            <input
                              className=" w-10 border-b-1 text-center"
                              min={0}
                              key={index}
                              type="number"
                              defaultValue={load}
                              onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                const value = target.value;
                                changeItemRecord(objIndex, index, value);
                              }}
                            />
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="m-auto flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 hover:bg-yellow-400">
                        <img
                          className=" h-2/3 w-2/3"
                          src={TrashCan}
                          onClick={(e) => {
                            const target = e.target as HTMLButtonElement;
                            const indexRemove = target.id;
                            const newMenuList = menuList.filter(
                              (_, index) => index !== Number(indexRemove),
                            );
                            resetMenuList(newMenuList);
                          }}
                        />
                      </div>

                      {/* </button> */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      }

      {/* <input id="setMenuPublic" type="checkbox" onChange={setMenuPublic} />
      <label htmlFor="setMenuPublic">{menuPublic ? "公開" : "不公開"}</label> */}
      <button
        type="button"
        style={{ backgroundColor: "black", color: "white" }}
        onClick={() => {
          if (itemPointer < menuList.length) {
            toast.error("請先完成目前項目");
            return;
          }
          addMenuRecord();
        }}
      >
        submit
      </button>
    </div>
  );
}
