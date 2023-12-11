import { Select, SelectItem } from '@nextui-org/react';
import { useEffect } from 'react';
import { BarChart } from '../../charts/BarChart';
import { HighestChart } from '../../charts/HighestChart';
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
        <div className="bg-white min-h-full flex flex-col items-center sm:flex-row">
            <div>
                <p className=" text-center p-2  text-2xl font-semibold sm:ml-3">
                    請點選訓練部位
                </p>

                <BodyComponent />
            </div>

            {itemGroup !== 'default' && (
                <>
                    <div className="w-full h-full flex flex-col bg-white ">
                        <Select
                            // labelPlacement="outside"
                            variant="faded"
                            aria-label="選擇項目"
                            placeholder="選擇項目"
                            className="w-full max-h-12 p-3 mb-3 sm:ml-3"
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
                        <div className="byChartBoard">
                            <HighestChart />
                            {/* <BarChart /> */}
                            {itemHistory.length > 0 && <BarChart />}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
{
    /* <select
                    value={itemGroup}
                    onChange={(e) => {
                        setItemGroup(e.target.value);
                        setItemGroupIndex(groupList.indexOf(e.target.value));
                        setItemName('default');
                        console.log('item', itemName);
                    }}
                >
                    <option value={'default'} disabled>
                        Choose a section
                    </option>
                    {group.map((item) => {
                        return (
                            <option
                                key={item.sectionName}
                                value={item.sectionName}
                            >
                                {item.sectionName}
                            </option>
                        );
                    })}
                </select>
                <select
                    value={itemName}
                    onChange={(e) => {
                        setItemName(e.target.value);
                        getItemMaxRecords();
                        getItemHistory();
                    }}
                >
                    <option value={'default'} disabled>
                        Choose an option
                    </option>
                    {group[itemGroupIndex].sectionItems.map((item, index) => {
                        return (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </select> */
}
