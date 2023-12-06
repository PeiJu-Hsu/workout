import { useEffect } from "react";
import { BarChart } from "../../charts/BarChart";
import { HighestChart } from "../../charts/HighestChart";
import { RecordStore } from "../../stores/RecordStore";
import { useUserStore } from "../../stores/UserStore";
import { group, groupList } from "../../utils/TrainingItems";
import { BodyComponent } from "./BodyComponent";

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
  const getCurrentUserInfo = useUserStore((state) => state.getCurrentUserInfo);

  useEffect(() => {
    fetchRecordData();
    getCurrentUserInfo();
    // fetchRecordData().then((res) => {
    //   if (res) console.log(res);
  }, []);

  return (
    <div className=" myPageContainer">
      <div style={{ width: "100%", border: "1px solid gray" }}>
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
        <BodyComponent />
      </div>
      {itemGroup !== "default" && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            border: "1px solid gray",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
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
          </div>

          {itemHistory.length > 0 && <BarChart />}
        </div>
      )}
    </div>
  );
}
