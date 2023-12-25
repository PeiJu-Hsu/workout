import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { useUserStore } from '../stores/UserStore';
import { EyeFilledIcon, EyeSlashFilledIcon } from './EyeIcon';

interface PropInput {
    id: string;
}
export default function InputPassword({ id }: PropInput) {
    const setInputTextToState = useUserStore(
        (state) => state.setInputTextToState
    );
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Input
            variant="underlined"
            color="warning"
            classNames={{
                label: 'text-white',
                input: 'text-white',
            }}
            label="Password"
            id={id}
            onChange={(e) => {
                setInputTextToState(e.target.id, e.target.value);
            }}
            endContent={
                <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    )}
                </button>
            }
            type={isVisible ? 'text' : 'password'}
        />
    );
}
