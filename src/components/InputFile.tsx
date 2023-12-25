import { Input } from '@nextui-org/react';
import { useUserStore } from '../stores/UserStore';
interface PropInput {
    id: string;
}

export function InputFile({ id }: PropInput) {
    const setInputTextToState = useUserStore(
        (state) => state.setInputTextToState
    );
    return (
        <Input
            classNames={{
                input: ' text-white',
                label: 'text-white',
            }}
            type="file"
            accept="image/*"
            variant="underlined"
            label="Photo"
            labelPlacement="outside"
            placeholder="Choose a photo"
            id={id}
            onChange={(e) => {
                if (e.target.files) {
                    setInputTextToState(e.target.id, e.target.value);
                }
            }}
        />
    );
}
