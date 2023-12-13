import ReactECharts from 'echarts-for-react';
import { RecordStore } from '../stores/RecordStore';

export const HighestChart = () => {
    const { itemName, itemMaxRecord } = RecordStore();
    const option = {
        title: {
            text:
                itemName === 'default'
                    ? '請選擇訓練項目'
                    : itemMaxRecord.date
                      ? '記錄日:' + itemMaxRecord.date
                      : '目前沒有紀錄',
            left: 'center',
            bottom: '10%',
            textStyle: {
                fontSize: 16,
                fontFamily: 'Roboto',
            },
        },
        series: [
            {
                type: 'gauge',

                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: Number(itemMaxRecord[itemName]) < 100 ? 100 : 150,
                splitNumber: 10,
                radius: '100%',
                itemStyle: {
                    color: '#FEC748',
                    shadowColor: 'lightgray',
                    shadowBlur: 10,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                },
                progress: {
                    show: true,
                    roundCap: true,
                    width: 18,
                },
                pointer: {
                    icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                    length: '60%',
                    width: 16,
                    offsetCenter: [0, '5%'],
                },
                axisLine: {
                    roundCap: true,
                    lineStyle: {
                        width: 12,
                    },
                },
                axisTick: {
                    splitNumber: 2,
                    lineStyle: {
                        width: 2,
                        color: '#999',
                    },
                },
                splitLine: {
                    length: 10,
                    lineStyle: {
                        width: 3,
                        color: '#999',
                    },
                },
                axisLabel: {
                    distance: 20,
                    color: '#999',
                    fontSize: 16,
                },
                title: {
                    show: true,
                },
                detail: {
                    backgroundColor: '#fff',
                    borderColor: '#999',
                    borderWidth: 2,
                    width: '80%',
                    lineHeight: 25,
                    height: 25,
                    borderRadius: 8,
                    offsetCenter: [0, '35%'],
                    valueAnimation: true,
                    formatter: function (value: number) {
                        if (Number(value)) {
                            return '{value|' + value.toFixed(0) + '}{unit|kg}';
                        } else {
                            return '{value|' + 0 + '}{unit|kg}';
                        }
                    },
                    rich: {
                        value: {
                            fontSize: 20,
                            fontWeight: 'bolder',
                            color: '#777',
                        },
                        unit: {
                            fontSize: 15,
                            color: '#999',
                            padding: [0, 0, -20, 10],
                        },
                    },
                },
                data: [
                    {
                        value:
                            itemName === 'default'
                                ? null
                                : Number(itemMaxRecord[itemName]),
                    },
                ],
            },
        ],
    };
    return (
        <div className="pt-3 w-full">
            <ReactECharts option={option} />
        </div>
    );
};
