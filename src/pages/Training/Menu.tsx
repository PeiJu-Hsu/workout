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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TrashCan from "../../icons/trash.png";
import { MenuStore } from "../../stores/MenuStore";
import { useUserStore } from "../../stores/UserStore";
import { group, groupList } from "../../utils/TrainingItems";
interface PropsType {
  itemPointer: number;
}
export default function Menu({ itemPointer }: PropsType) {
  const {
    itemGroup,
    itemGroupIndex,
    itemName,
    runCount,
    menuList,
    setItemGroup,
    setItemGroupIndex,
    setItemName,
    setLoading,
    setRunCount,
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
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
  // const tableHeader = [
  //   {
  //     key: "itemName",
  //     label: "ITEM",
  //   },
  //   {
  //     key: "records",
  //     label: "LOAD",
  //   },
  //   {
  //     key: "remove",
  //     label: "REMOVE",
  //   },
  // ];
  // const rows = [
  //   {
  //     key: "1",
  //     itemName: "Tony Reichert",
  //     loading: 20,
  //     records: [20, 20, 20],
  //     runCount: 3,
  //   },
  //   {
  //     key: "2",
  //     itemName: "Zoey Lang",
  //     loading: 20,
  //     records: [20, 20, 20],
  //     runCount: 3,
  //   },
  // ];
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
    // getCurrentUserInfo();
    getStudentList();
    console.log("menuList:", menuList);
  }, []);

  return (
    <div className="w-full">
      <select
        value={itemGroup}
        onChange={(e) => {
          setItemGroup(e.target.value);
          setItemGroupIndex(groupList.indexOf(e.target.value));
          setItemName("default");
        }}
      >
        <option value={"default"} disabled>
          Choose a section
        </option>
        {group.map((item) => {
          return (
            <option key={item.sectionName} value={item.sectionName}>
              {item.sectionName}
            </option>
          );
        })}
      </select>
      <select value={itemName} onChange={(e) => setItemName(e.target.value)}>
        <option value={"default"} disabled>
          Choose an option
        </option>
        {group[itemGroupIndex].sectionItems.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>

      <input
        type="number"
        placeholder="輸入重量 (kg)"
        onChange={(e) => setLoading(Number(e.target.value))}
      />
      <select
        value={runCount}
        onChange={(e) => setRunCount(Number(e.target.value))}
      >
        <option value={"default"} disabled>
          設定組數
        </option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
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
            onChange={(e) => setTargetStudent(e.target.value)}
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
                      <div className="flex flex-col justify-between sm:flex-row">
                        {item.records.map((load, index) => {
                          return (
                            <input
                              className="w-full text-center"
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
