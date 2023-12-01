import ReactECharts from "echarts-for-react";
import { RecordStore } from "../stores/RecordStore";

export const BarChart = () => {
  const itemHistory = RecordStore((state) => state.itemHistory);
  const xAxisData = itemHistory.map((item) => item.date).reverse();
  const yAxisData = itemHistory.map((item) => item.weight).reverse();
  const option = {
    // xAxis: {
    //   type: "category",
    //   data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    // },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: yAxisData,
        type: "bar",
      },
    ],
  };
  return <ReactECharts option={option} />;
};
