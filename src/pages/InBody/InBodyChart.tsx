import { Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import { InBodyLineChart } from '../../charts/InBodyLineChart';
interface labelTexts {
    type: string;
    labelText: string;
    id: string;
}

const selectionItems: labelTexts[] = [
    {
        type: 'number',
        labelText: 'inBody評分',
        id: 'inBodyScore',
    },
    {
        type: 'number',
        labelText: '身高',
        id: 'height',
    },
    {
        type: 'number',
        labelText: '體重',
        id: 'weight',
    },
    {
        type: 'number',
        labelText: '體脂肪重',
        id: 'bodyFat',
    },
    {
        type: 'number',
        labelText: '骨骼肌重',
        id: 'bodyMuscle',
    },
    {
        type: 'number',
        labelText: '身體總水重',
        id: 'bodyWater',
    },

    {
        type: 'number',
        labelText: '蛋白質重',
        id: 'bodyProtein',
    },
    {
        type: 'number',
        labelText: '礦物質重',
        id: 'bodyMineral',
    },
];

export default function InBodyChart() {
    const [targetItem, setTargetItem] = useState('weight');
    const [unit, setUnit] = useState('kg');

    return (
        <div className="border flex-grow bg-white p-3 rounded-2xl ">
            <div className="w-full h-full flex flex-col bg-white">
                <Select
                    variant="faded"
                    aria-label="選擇項目"
                    placeholder="選擇項目"
                    className="w-full max-h-12 p-3 mb-3 sm:ml-3"
                    onChange={(e) => {
                        setTargetItem(e.target.value);
                        setUnit(
                            e.target.value === 'height'
                                ? 'cm'
                                : e.target.value === 'inBodyScore'
                                  ? ''
                                  : 'kg'
                        );
                    }}
                >
                    {selectionItems.map((item) => {
                        return (
                            <SelectItem key={item.id} value={item.id}>
                                {item.labelText}
                            </SelectItem>
                        );
                    })}
                </Select>
                <div>
                    <InBodyLineChart targetItem={targetItem} unit={unit} />
                </div>
            </div>
        </div>
    );
}
