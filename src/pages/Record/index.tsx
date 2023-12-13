import { Select, SelectItem } from '@nextui-org/react';
import { useEffect } from 'react';
import { BarChart } from '../../charts/BarChart';
import { RecordStore } from '../../stores/RecordStore';
import { group } from '../../utils/TrainingItems';
import { BodyComponent } from './BodyComponent';

export default function Record() {
    const {
        itemGroup,
        itemGroupIndex,
        itemHistory,
        fetchRecordData,
        setItemName,
        getItemMaxRecords,
        getItemHistory,
    } = RecordStore();

    useEffect(() => {
        fetchRecordData();
    }, []);

    return (
        <div className="w-full h-full flex flex-col gap-3 items-center sm:flex-row">
            <div>
                <p className="text-center ml-7 text-xl font-semibold">
                    請點選訓練部位
                </p>
                <BodyComponent />
            </div>
            <div className="w-full flex flex-col justify-start">
                <Select
                    // labelPlacement="outside"
                    variant="bordered"
                    aria-label="選擇項目"
                    placeholder="選擇項目"
                    className="w-full max-h-12 mb-3 max-w
                    "
                    onChange={(e) => {
                        setItemName(e.target.value);
                        getItemMaxRecords();
                        getItemHistory();
                    }}
                >
                    {group[itemGroupIndex].sectionItems.map((item) => {
                        return (
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                        );
                    })}
                </Select>
                <div className="w-full">
                    {/* <HighestChart /> */}
                    <BarChart />
                    {/* {itemHistory.length > 0 && <BarChart />} */}
                </div>
            </div>
        </div>
    );
}
