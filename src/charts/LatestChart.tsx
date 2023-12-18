import ReactECharts from 'echarts-for-react';
import { RecordStore } from '../stores/RecordStore';

export const LatestChart = () => {
    const { itemRecords } = RecordStore();
    itemRecords.forEach((item) => {
        const newSummary = Object.entries(item.MaxSummary).map(
            ([itemName, max]) => ({ itemName, max })
        );
        item.MaxSummary = newSummary;
    });
    const source0 = itemRecords.map((item) => item.formatTime).reverse();
    source0.unshift('Date');
    const option = {
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['product', '2015', '2016', '2017'],
                ['Matcha Latte', 43.3, 85.8, 93.7],
                ['Milk Tea', 83.1, 73.4, 55.1],
                ['Cheese Cocoa', 86.4, 65.2, 82.5],
                ['Walnut Brownie', 72.4, 53.9, 39.1],
            ],
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
    };

    return (
        <div
            style={{
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ width: '100%', border: '1px solid red' }}>
                <ReactECharts option={option} />
            </div>
        </div>
    );
};
