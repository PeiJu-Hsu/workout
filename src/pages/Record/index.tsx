import { useEffect } from "react";
import { BarChart } from "../../charts/BarChart";
import { HighestChart } from "../../charts/HighestChart";
import { RecordStore } from "../../stores/RecordStore";
import { group, groupList } from "../../utils/TrainingItems";
export default function Record() {
  const {
    itemGroup,
    itemGroupIndex,
    itemName,
    fetchRecordData,
    setItemGroup,
    setItemGroupIndex,
    setItemName,
    getItemMaxRecords,
    getItemHistory,
  } = RecordStore();

  useEffect(() => {
    fetchRecordData();
    // fetchRecordData().then((res) => {
    //   if (res) console.log(res);
  }, []);

  return (
    <>
      <h1>Record</h1>
      <select
        value={itemGroup}
        onChange={(e) => {
          setItemGroup(e.target.value);
          setItemGroupIndex(groupList.indexOf(e.target.value));
          setItemName("default");
          console.log("item", itemName);
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
      <select
        value={itemName}
        onChange={(e) => {
          setItemName(e.target.value);
          getItemMaxRecords();
          getItemHistory();
        }}
      >
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
      <HighestChart />
      <BarChart />
    </>
  );
}
