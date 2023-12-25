import { Select, SelectItem } from '@nextui-org/react';
import { MenuStore } from '../../stores/MenuStore';
import { group } from '../../utils/TrainingItems';

export default function SelectWorkOutItem() {
    const setItemName = MenuStore((state) => state.setItemName);
    const itemGroupIndex = MenuStore((state) => state.itemGroupIndex);
    return (
        <Select
            isRequired
            label="選擇訓練項目"
            placeholder="選擇訓練項目"
            defaultSelectedKeys=""
            onChange={(e) => {
                setItemName(e.target.value);
            }}
        >
            {group[itemGroupIndex]?.sectionItems.map((item) => (
                <SelectItem key={item} value={item}>
                    {item}
                </SelectItem>
            ))}
        </Select>
    );
}
