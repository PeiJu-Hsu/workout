import ReactECharts from 'echarts-for-react';
import { InBodyStore } from '../stores/InBodyStore';

export const ScoreChart = () => {
    const inBodyScore = InBodyStore((state) => state.inBodyScore);
    const option = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                radius: '90%',
                min: 0,
                max: 100,
                splitNumber: 8,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.5, '#D92139'],
                            [0.7, '#FEC748'],
                            [0.9, '#AEC33A'],
                            [1, '#253F58'],
                        ],
                    },
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 20,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                        color: 'auto',
                    },
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                        color: 'auto',
                        width: 2,
                    },
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: 'auto',
                        width: 5,
                    },
                },
                axisLabel: {
                    color: '#464646',
                    fontSize: 20,
                    distance: -60,
                    rotate: 'tangential',
                    formatter: function (value: number) {
                        if (value === 90) {
                            return '無與倫比的完美';
                        } else if (value === 70) {
                            return '很棒的分數，繼續保持';
                        } else if (value === 50) {
                            return '繼續加油，往70分前進';
                        } else return '';
                    },
                },
                title: {
                    offsetCenter: [0, '-0%'],
                    fontSize: 20,
                },
                detail: {
                    fontSize: 30,
                    offsetCenter: [0, '-25%'],
                    valueAnimation: true,
                    formatter: function (value: number) {
                        return Math.round(value) + '';
                    },
                    color: 'inherit',
                },
                data: [
                    {
                        value: inBodyScore,
                        name: 'InBody Score',
                    },
                ],
            },
        ],
    };
    return (
        <div className="myChartContainer">
            <ReactECharts option={option} />
        </div>
    );
};
