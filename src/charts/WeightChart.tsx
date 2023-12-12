import ReactECharts from 'echarts-for-react';
import { InBodyStore } from '../stores/InBodyStore';

export const WeightChart = () => {
    const InBodyHistory = InBodyStore((state) => state.InBodyHistory);
    const legendData = ['體重(kg)', '骨骼肌重(kg)', '體脂肪率(%)'];
    const xAxisData = InBodyHistory.map((obj) => obj.formatTime).reverse();
    const weightData = InBodyHistory.map((obj) => obj.weight).reverse();
    const bodyMuscleData = InBodyHistory.map((obj) => obj.bodyMuscle).reverse();
    const fatRatioData = InBodyHistory.map((obj) => obj.fatRatio).reverse();

    const usingData = [weightData, bodyMuscleData, fatRatioData];
    const series = legendData.map((item, index) => ({
        name: item,
        type: 'line',
        data: usingData[index],
        symbolSize: 10,
    }));
    const option = {
        color: [
            '#253f58',
            '#AEC33A',
            '#FEC748',
            '#D92139',
            '#2f4554',
            '#61a0a8',
            '#d48265',
            '#91c7ae',
            '#749f83',
            '#ca8622',
            '#bda29a',
            '#6e7074',
            '#546570',
            '#c4ccd3',
        ],
        title: {
            text: 'InBody 紀錄',
            textStyle: {
                fontFamily: 'Roboto',
                fontSize: 24,
            },
            left: 'center',
            top: '10',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: legendData,
            bottom: 'bottom',
        },
        xAxis: {
            name: '量測日期',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                fontFamily: 'Roboto',
                fontSize: 14,
            },
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
        },
        yAxis: {
            type: 'value',
        },
        series: series,
    };
    return (
        <div className="myChartContainer">
            <ReactECharts option={option} />
        </div>
    );
};
