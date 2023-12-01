import { useEffect, useState } from "react";
import { BarChart } from "../../charts/BarChart";
import { HighestChart } from "../../charts/HighestChart";
import { RecordStore } from "../../stores/RecordStore";
import { group, groupList } from "../../utils/TrainingItems";
import { BodyComponent } from "./BodyComponent";
const exampleParams = {
  head: { selected: true },
  left_arm: { show: false },
};
export default function Record() {
  const {
    itemGroup,
    itemGroupIndex,
    itemName,
    itemHistory,
    fetchRecordData,
    setItemGroup,
    setItemGroupIndex,
    setItemName,
    getItemMaxRecords,
    getItemHistory,
  } = RecordStore();
  const [params, setParams] = useState<any>();
  const [bodyModel, setBodyModel] = useState<string>();
  // const onChange = (parts: PartsInput) => console.log("Changed Parts:", parts);
  // const onClick = (id: string) => {
  //   console.log("Changed Id:", id);
  //   console.log("Changed data");
  // };

  useEffect(() => {
    fetchRecordData();
    // fetchRecordData().then((res) => {
    //   if (res) console.log(res);
  }, []);

  return (
    <>
      <h1>Record</h1>
      <div>
        <button onClick={() => setParams(exampleParams)}>Pass Params</button>
        <button onClick={() => setParams(null)}>Clear Params</button>
        <button onClick={() => setBodyModel("male")}>Male Model</button>
        <button onClick={() => setBodyModel("female")}>Female Model</button>
        {params ? (
          <div>
            Showing with params {JSON.stringify(exampleParams, null, 2)}
            <BodyComponent
              partsInput={params}
              // onChange={onChange}
              // onClick={onClick}
              bodyModel={bodyModel}
            />
          </div>
        ) : (
          <div>
            Example With no Params
            <BodyComponent
              // onChange={onChange}
              // onClick={onClick}
              bodyModel={bodyModel}
            />
          </div>
        )}
      </div>
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
      {itemHistory.length > 0 && <BarChart />}
    </>
  );
}
