import ReactECharts from 'echarts-for-react';
import { RecordStore } from '../stores/RecordStore';

export const BarChart = () => {
    const itemHistory = RecordStore((state) => state.itemHistory);
    const xAxisData = itemHistory.map((item) => item.date).reverse();
    const yAxisData = itemHistory.map((item) => item.weight).reverse();
    const historyLength = itemHistory.length;
    const isEmptyRecord = historyLength === 0;
    const chartMemo = (
        <p className="font-bold text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            目前沒有紀錄
        </p>
    );

    const optionNew = {
        title: {
            text: '負重紀錄',
            left: 'center',
            textStyle: {
                fontSize: 26,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'line' },
            formatter: '訓練日期: {b0} <br/> 訓練重量: {c0} kg',
            textStyle: {
                fontSize: 12,
                fontFamily: 'Roboto',
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
            axisLine: {
                show: true,
            },
            type: 'value',
            name: '訓練重量 (kg)',
            nameLocation: 'center',
            nameGap: 25,
            nameTextStyle: {
                fontSize: 16,
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
    return (
        <div className="pt-3 bg-white rounded-2xl w-full border relative">
            {isEmptyRecord && chartMemo}
            <ReactECharts option={optionNew} />
        </div>
    );
};
