import { Input } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { MenuStore } from '../../stores/MenuStore';
interface PropsInputType {
    id: string;
    type: string;
    label: string;
    className?: {
        label: string;
        input: string;
        description: string | undefined;
    };
}

export default function InputLoadingNumber({
    id,
    type,
    label,
}: PropsInputType) {
    const setLoading = MenuStore((state) => state.setLoading);
    const itemName = MenuStore((state) => state.itemName);
    return (
        <Input
            isDisabled={itemName === ''}
            type={type}
            min={0}
            max={200}
            label={label}
            id={id}
            onChange={(e) => {
                if (
                    Number(e.target.value) < 0 ||
                    Number(e.target.value) > 200
                ) {
                    toast.error('目標重量需介於0~200kg之間');
                    setLoading('default');
                    return;
                }
                setLoading(Number(e.target.value));
            }}
        />
    );
}
