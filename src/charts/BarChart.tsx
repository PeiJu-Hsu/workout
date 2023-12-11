import ReactECharts from 'echarts-for-react';
import { RecordStore } from '../stores/RecordStore';

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
            type: 'category',
            data: xAxisData,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: yAxisData,
                type: 'bar',
            },
        ],
    };
    const optionNew = {
        title: {
            text: '負重紀錄',
            left: 'center',
            textStyle: {
                fontSize: 26,
            },
        },
        color: ['#00000'],
        xAxis: {
            type: 'category',
            data: xAxisData,
            name: '訓練日期',
            nameLocation: 'center',
            nameGap: 30,
            nameTextStyle: {
                fontSize: 18,
                fontFamily: 'Roboto',
            },
        },
        yAxis: {
            type: 'value',
            name: '訓練重量 (kg)',
            nameLocation: 'center',
            nameGap: 30,
            nameTextStyle: {
                fontSize: 18,
                fontFamily: 'Roboto',
            },
        },
        series: [
            {
                data: yAxisData,
                type: 'bar',
                cursor: 'default',
            },
        ],
    };
    return <ReactECharts option={optionNew} />;
};
