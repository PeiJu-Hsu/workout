import { Input } from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MenuStore } from '../stores/MenuStore';
import { useUserStore } from '../stores/UserStore';
import { EyeFilledIcon, EyeSlashFilledIcon } from './EyeIcon';

interface PropInput {
    id: string;
}
interface PropsInputType {
    id: string;
    type: string;
    label: string;
    className?: { label: string };
}
interface PropsInputInBodyType {
    id: string;
    type: string;
    label: string;
    onChange: (e: any) => void;
}
// export default function InputUnit(type: string, labelText: string) {
//   return (
//     <div className="col">
//       <div className="form-outline">
//         <input type={type} id={labelText} className="form-control" />
//         <label className="form-label" htmlFor={labelText}>
//           {labelText}
//         </label>
//       </div>
//     </div>
//   );
// }
export function InputText({ id, type, label, className }: PropsInputType) {
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
            description={id === 'signUpName' ? '長度限制8個字元' : undefined}
            onChange={(e) => {
                setInputTextToState(e.target.id, e.target.value);
            }}
        />
    );
}
export function InputEmail({ id, type }: PropsInputType) {
    const setInputTextToState = useUserStore(
        (state) => state.setInputTextToState
    );
    return (
        <Input
            classNames={{
                input: 'text-white',
                label: 'text-white',
            }}
            variant="underlined"
            label="Email"
            id={id}
            onChange={(e) => {
                setInputTextToState(e.target.id, e.target.value);
            }}
            type={type}
        />
    );
}
export function InputPassword({ id }: PropInput) {
    const setInputTextToState = useUserStore(
        (state) => state.setInputTextToState
    );
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Input
            classNames={{
                label: 'text-gray-500',
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
export function InputLoadingNumber({ id, type, label }: PropsInputType) {
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
export function InputInBodyNumber({
    id,
    type,
    label,
    onChange,
}: PropsInputInBodyType) {
    return (
        <Input
            type={type}
            min={0}
            className=" w-36"
            label={label}
            placeholder={label}
            id={id}
            labelPlacement="outside-left"
            endContent={
                <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">
                        {type === 'number'
                            ? id === 'height'
                                ? 'cm'
                                : id !== 'inBodyScore'
                                  ? 'kg'
                                  : ''
                            : ''}
                    </span>
                </div>
            }
            onChange={onChange}
        />
    );
}
