import { Select, SelectItem } from '@nextui-org/react';
import { MenuStore } from '../../stores/MenuStore';
import { group, groupList } from '../../utils/TrainingItems';
export default function SelectMuscle() {
    const setItemGroup = MenuStore((state) => state.setItemGroup);
    const setItemGroupIndex = MenuStore((state) => state.setItemGroupIndex);
    const setItemName = MenuStore((state) => state.setItemName);
    return (
        <Select
            isRequired
            data-filled:after="OK"
            label="選擇訓練部位"
            placeholder="選擇訓練部位"
            defaultSelectedKeys=""
            onChange={(e) => {
                setItemGroup(e.target.value);
                setItemGroupIndex(groupList.indexOf(e.target.value));
                setItemName('');
            }}
        >
            {group.map((item) => (
                <SelectItem key={item.sectionName} value={item.sectionName}>
                    {item.sectionName}
                </SelectItem>
            ))}
        </Select>
    );
}
