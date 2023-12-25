import { Input } from '@nextui-org/react';
import { useUserStore } from '../stores/UserStore';
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
export default function InputText({
    id,
    type,
    label,
    className,
}: PropsInputType) {
    const setInputTextToState = useUserStore(
        (state) => state.setInputTextToState
    );
    return (
        <Input
            maxLength={id === 'signUpName' ? 8 : undefined}
            classNames={className}
            type={type}
            label={label}
            id={id}
            className="text-white"
            variant="underlined"
            color="warning"
            description={id === 'signUpName' ? '長度限制8個字元' : undefined}
            onChange={(e) => {
                setInputTextToState(e.target.id, e.target.value);
            }}
        />
    );
}
