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

export const group = [group1, group2, group3, group4, group5, group6];
export const groupList = group.map((item) => item.sectionName);
