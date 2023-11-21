import ReactECharts from "echarts-for-react";

export const Loading = () => {
  const option = {
    graphic: {
      elements: [
        {
          type: "text",
          left: "center",
          top: "center",
          style: {
            text: "WorkOut",
            fontSize: 80,
            fontWeight: "bold",
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: "transparent",
            stroke: "#000",
            lineWidth: 1,
          },
          keyframeAnimation: {
            duration: 2000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: "transparent",
                  lineDashOffset: 200,
                  lineDash: [200, 0],
                },
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: "orange",
                },
              },
              {
                percent: 1,
                style: {
                  fill: "orange",
                },
              },
            ],
          },
        },
      ],
    },
  };
  return <ReactECharts style={{ border: "1px solid red" }} option={option} />;
};
