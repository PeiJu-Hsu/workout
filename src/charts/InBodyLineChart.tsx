import ReactECharts from 'echarts-for-react';
import { InBodyStore } from '../stores/InBodyStore';
interface PropType {
    targetItem: string;
    unit: string;
}

export const InBodyLineChart = ({ targetItem, unit }: PropType) => {
    const InBodyHistory = InBodyStore((state) => state.InBodyHistory);
    const xAxisData = InBodyHistory.map((item) => item.formatTime).reverse();
    const yAxisData = InBodyHistory.map((item) => item[targetItem]).reverse();

    const optionNew = {
        title: {
            text: '歷史記錄',
            left: 'center',
            top: '15',
            textStyle: {
                fontSize: 24,
                fontFamily: 'Roboto',
            },
        },
        color: ['#00000'],
        grid: { left: '50', bottom: '60', right: '10' },
        xAxis: {
            type: 'category',
            data: xAxisData,
            name: '量測日期',
            nameLocation: 'center',
            nameGap: 30,
            nameTextStyle: {
                fontSize: 18,
                fontFamily: 'Roboto',
            },
        },
        yAxis: {
            type: 'value',
            name: '量測數值 ' + ' ' + unit,
            nameLocation: 'center',
            nameGap: 30,
            nameTextStyle: {
                fontSize: 18,
                fontFamily: 'Roboto',
            },
            min: function (value: any) {
                if (value.min < 20) {
                    return 0;
                } else {
                    return Math.floor((value.min - 20) / 10) * 10;
                }
            },
            max: function (value: any) {
                return Math.floor((value.max + 20) / 10) * 10;
            },
        },
        series: [
            {
                data: yAxisData,
                type: 'line',
                cursor: 'default',
            },
        ],
    };
    return (
        <div className="w-full justify-end">
            <ReactECharts option={optionNew} />
        </div>
    );
};
