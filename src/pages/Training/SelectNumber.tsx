import { Select, SelectItem } from '@nextui-org/react';
import { MenuStore } from '../../stores/MenuStore';
export default function SelectNumber({ max }: { max: number }) {
    const optionArray = new Array(max).fill(0).map((_item, index) => index + 1);
    const setRunCount = MenuStore((state) => state.setRunCount);
    const itemName = MenuStore((state) => state.itemName);
    return (
        <Select
            isRequired
            isDisabled={itemName === ''}
            label="設定組數"
            placeholder="設定組數"
            defaultSelectedKeys=""
            onChange={(e) => {
                setRunCount(Number(e.target.value));
            }}
        >
            {optionArray.map((item) => (
                <SelectItem className="text-black" key={item} value={item}>
                    {item.toString()}
                </SelectItem>
            ))}
        </Select>
    );
}
