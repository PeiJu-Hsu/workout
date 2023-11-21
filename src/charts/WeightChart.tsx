import ReactECharts from "echarts-for-react";
import { useEffect } from "react";
import { InBodyStore } from "../stores/InBodyStore";
interface InBodyObj {
  measureTime: Date;
  inBodyScore: number;
  height: number;
  weight: number;
  bodyWater: number;
  bodyFat: number;
  bodyProtein: number;
  bodyMineral: number;
  bodyMuscle: number;
  controlWeight: number;
  controlFat: number;
  controlMuscle: number;
  fatRatio: number;
  bmi: number;
  formatTime: string;
}
export const WeightChart = () => {
  useEffect(() => {
    const usingData = [weightData, bodyMuscleData, fatRatioData];
    console.log("usingData", usingData);
  });
  const InBodyHistory = InBodyStore((state) => state.InBodyHistory);
  //   const legendData = [
  //     "Email",
  //     "Union Ads",
  //     "Video Ads",
  //     "Direct",
  //     "Search Engine",
  //   ];
  const legendData = ["體重(kg)", "骨骼肌重(kg)", "體脂肪率(%)"];

  //   const xAxisData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const xAxisData = InBodyHistory.map(
    (obj: InBodyObj) => obj.formatTime
  ).reverse();
  const weightData = InBodyHistory.map(
    (obj: InBodyObj) => obj.weight
  ).reverse();
  const bodyMuscleData = InBodyHistory.map(
    (obj: InBodyObj) => obj.bodyMuscle
  ).reverse();
  const fatRatioData = InBodyHistory.map(
    (obj: InBodyObj) => obj.fatRatio
  ).reverse();

  const usingData = [weightData, bodyMuscleData, fatRatioData];
  //   const usingData = [
  //     [120, 132, 101, 134, 90, 230, 210],
  //     [220, 182, 191, 234, 290, 330, 310],
  //     [150, 232, 201, 154, 190, 330, 410],
  //     [320, 332, 301, 334, 390, 330, 320],
  //     [820, 932, 901, 934, 1290, 1330, 1320],
  //   ];
  const series = legendData.map((item, index) => ({
    name: item,
    type: "line",
    data: usingData[index],
  }));
  const option = {
    title: {
      text: "InBody data History",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: legendData,
    },
    // grid: {
    //   left: "3%",
    //   right: "4%",
    //   bottom: "3%",
    //   containLabel: true,
    // },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: series,
    // series: [
    //   {
    //     name: "Email",
    //     type: "line",
    //     stack: "Total",
    //     data: [120, 132, 101, 134, 90, 230, 210],
    //   },
    //   {
    //     name: "Union Ads",
    //     type: "line",
    //     stack: "Total",
    //     data: [220, 182, 191, 234, 290, 330, 310],
    //   },
    //   {
    //     name: "Video Ads",
    //     type: "line",
    //     stack: "Total",
    //     data: [150, 232, 201, 154, 190, 330, 410],
    //   },
    //   {
    //     name: "Direct",
    //     type: "line",
    //     stack: "Total",
    //     data: [320, 332, 301, 334, 390, 330, 320],
    //   },
    //   {
    //     name: "Search Engine",
    //     type: "line",
    //     stack: "Total",
    //     data: [820, 932, 901, 934, 1290, 1330, 1320],
    //   },
    // ],
  };
  return (
    <div style={{ width: "75%" }}>
      <ReactECharts option={option} />
    </div>
  );
};
