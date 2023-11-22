import { MenuStore } from "../../stores/MenuStore";
interface CreateNewArray {
  (length: number, content: React.ReactNode): string[];
}
export default function Menu() {
  const {
    itemGroup,
    itemGroupIndex,
    itemName,
    loading,
    runCount,
    menuList,
    setItemGroup,
    setItemGroupIndex,
    setItemName,
    setLoading,
    setRunCount,
    setMenuList,
    resetMenuList,
  } = MenuStore();
  const group1 = {
    sectionName: "胸",
    sectionItems: ["卧推", "上斜推舉", "下斜推舉", "飛鳥", "夾胸"],
  };
  const group2 = {
    sectionName: "背",
    sectionItems: ["引體向上", "划船", "高位下拉", "低位下拉", "硬舉"],
  };
  const group3 = {
    sectionName: "腿",
    sectionItems: ["深蹲", "硬舉", "蹲舉", "腿推", "腿彎舉"],
  };
  const group4 = {
    sectionName: "腹",
    sectionItems: ["仰臥起坐", "平板撐體", "腹肌下拉", "腹肌上拉", "腹肌側拉"],
  };
  const group5 = {
    sectionName: "肩",
    sectionItems: ["肩推", "側平舉", "前平舉", "後平舉", "上拉"],
  };
  const group6 = {
    sectionName: "手臂",
    sectionItems: [
      "二頭彎舉",
      "三頭伸展",
      "二頭下拉",
      "三頭下拉",
      "二頭上拉",
      "三頭上拉",
    ],
  };

  const group = [group1, group2, group3, group4, group5, group6];
  const groupList = group.map((item) => item.sectionName);
  const createNewArray: CreateNewArray = (length, content) => {
    const filledArray = new Array(length).fill(content);
    return filledArray;
  };
  return (
    <div>
      <select
        value={itemGroup}
        id="test"
        onChange={(e) => {
          setItemGroup(e.target.value);
          setItemGroupIndex(groupList.indexOf(e.target.value));
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
        defaultValue={"default"}
        onChange={(e) => setItemName(e.target.value)}
      >
        <option value={"default"} disabled>
          Choose an option
        </option>
        {group[itemGroupIndex].sectionItems.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      {/* <select
        value={loading}
        defaultValue={"default"}
        onChange={(e) => setLoading(Number(e.target.value))}
      >
        <option value={"default"} disabled>
          設定重量
        </option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select> */}
      <input
        type="number"
        placeholder="輸入重量 (kg)"
        onChange={(e) => setLoading(Number(e.target.value))}
      />
      <select
        value={runCount}
        defaultValue={"default"}
        onChange={(e) => setRunCount(Number(e.target.value))}
      >
        <option value={"default"} disabled>
          設定組數
        </option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      <h1>設定項目</h1>
      <h4>選擇肌群 {itemGroup === "default" ? "請選擇肌群" : itemGroup}</h4>
      <h4>項目名稱 {itemName === "default" ? "請選擇動作" : itemName}</h4>
      <h4>目標重量 {loading === "default" ? "請選擇重量" : loading}</h4>
      <h4>預計組數 {runCount === "default" ? "請選擇組數" : runCount}</h4>
      <button type="button" onClick={setMenuList}>
        新增項目
      </button>
      <h2>Menu as below</h2>
      {menuList.map((item, index) => {
        // const inputNumber = <input type="number" />
        // const filledArray = new Array({item.runCount}).fill(inputNumber)
        // console.log(filledArray)
        return (
          <div key={index}>
            <input type="checkbox" />
            {item.itemName}
            {/* {createNewArray(item.runCount, `${(<input type="number" />)}`)} */}
            {createNewArray(item.runCount, item.loading).map((item) => {
              return <input type="number" defaultValue={item} />;
            })}
            <button
              type="button"
              id={index.toString()}
              onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                const indexRemove = target.id;
                console.log("Button clicked with index:", index);
                // resetMenuList(menuList.splice(Number(index), 1));
                const newMenuList = menuList.filter(
                  (_, index) => index !== Number(indexRemove)
                );
                console.log("menuList:", newMenuList);
                resetMenuList(newMenuList);
              }}
            >
              刪除
            </button>
          </div>
        );
      })}
    </div>
  );
}
