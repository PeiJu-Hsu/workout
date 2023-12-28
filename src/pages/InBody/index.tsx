import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { InBodyStore } from '../../stores/InBodyStore';
import InBodyChart from './InBodyChart';
interface labelTexts {
    type: string;
    labelText: string;
    id: string;
}
const labelTexts: labelTexts[] = [
    {
        type: 'date',
        labelText: '量測日期',
        id: 'measureTime',
    },
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
];

const labelTextsOptional: labelTexts[] = [
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

    {
        type: 'number',
        labelText: '體重控制',
        id: 'controlWeight',
    },
    {
        type: 'number',
        labelText: '脂肪控制',
        id: 'controlFat',
    },
    {
        type: 'number',
        labelText: '肌肉控制',
        id: 'controlMuscle',
    },
];
const svgPath = {
    rightPath: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
        />
    ),
    leftPath: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
        />
    ),
    uploadSVG: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
        </svg>
    ),
};
export default function InBody() {
    const addInBodyData = InBodyStore((state) => state.addInBodyData);
    const setInputNumberToState = InBodyStore(
        (state) => state.setInputNumberToState
    );
    const [ShowMore, setShowMore] = useState('hidden');
    const [divWidth, setDivWidth] = useState('w-80');

    // function for rendering
    const renderInput = () => {
        return labelTexts.map((obj) => (
            <div key={obj.id} className="flex items-center">
                <div className=" w-28">
                    <p>
                        {obj.labelText}
                        <sup className="text-red-400"> *</sup>
                    </p>
                </div>
                <div className="flex-grow">
                    <Input
                        type={obj.type}
                        min={0}
                        className="w-36"
                        label=""
                        id={obj.id}
                        labelPlacement="outside-left"
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                    {obj.type === 'number'
                                        ? obj.id === 'height'
                                            ? 'cm'
                                            : obj.id !== 'inBodyScore'
                                              ? 'kg'
                                              : ''
                                        : ''}
                                </span>
                            </div>
                        }
                        onChange={(e) => {
                            if (Number(e.target.value) < 0) {
                                toast.error('數值必須大於0');
                                return;
                            }
                            setInputNumberToState(
                                e.target.id,
                                obj.type === 'number'
                                    ? Number(e.target.value)
                                    : new Date(e.target.value)
                            );
                        }}
                    />
                    {/* <Input
                        type={obj.type}
                        id={obj.id}
                        label=""
                        onChange={(e) => {
                            if (Number(e.target.value) < 0) {
                                toast.error('數值必須大於0');
                                return;
                            }
                            setInputNumberToState(
                                e.target.id,
                                obj.type === 'number'
                                    ? Number(e.target.value)
                                    : new Date(e.target.value)
                            );
                        }}
                    /> */}
                </div>
            </div>
        ));
    };
    const renderInputOptional = () => {
        return labelTextsOptional.map((obj) => (
            <div key={obj.id} className="flex items-center">
                <div className=" w-28">
                    <p>{obj.labelText}</p>
                </div>
                <div className=" flex-grow">
                    <Input
                        type={obj.type}
                        min={0}
                        className="w-36"
                        label=""
                        id={obj.id}
                        labelPlacement="outside-left"
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                    {obj.type === 'number'
                                        ? obj.id === 'height'
                                            ? 'cm'
                                            : obj.id !== 'inBodyScore'
                                              ? 'kg'
                                              : ''
                                        : ''}
                                </span>
                            </div>
                        }
                        onChange={(e) => {
                            if (Number(e.target.value) < 0) {
                                toast.error('數值必須大於0');
                                return;
                            }
                            setInputNumberToState(
                                e.target.id,
                                obj.type === 'number'
                                    ? Number(e.target.value)
                                    : new Date(e.target.value)
                            );
                        }}
                    />
                </div>
            </div>
        ));
    };

    return (
        <div className=" h-full flex flex-wrap items-center gap-2">
            <div
                className={`flex flex-col ${divWidth} max-w-2xl m-auto gap-y-2 border bg-white p-3 rounded-2xl `}
            >
                <div className="flex justify-between items-center">
                    <h3 className="font-bold leading-none ">InBody數據</h3>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 stroke-gray-400"
                        onClick={() => {
                            setShowMore(ShowMore === 'hidden' ? '' : 'hidden');
                            setDivWidth(
                                divWidth === 'w-80' ? 'w-full' : 'w-80'
                            );
                        }}
                    >
                        {ShowMore === 'hidden'
                            ? svgPath.rightPath
                            : svgPath.leftPath}
                    </svg>
                </div>
                <div className=" border-1 border-gray-300" />
                <div className=" flex flex-col justify-between gap-2 md:flex-row">
                    <div className="flex flex-col gap-y-2">{renderInput()}</div>
                    <div className={`flex flex-col gap-y-2 ${ShowMore}`}>
                        {renderInputOptional()}
                    </div>
                </div>
                <Button
                    className=" w-full rounded-full bg-gray-400 text-lg font-bold text-white hover:bg-black"
                    onClick={async () => {
                        await addInBodyData();
                    }}
                    endContent={svgPath.uploadSVG}
                >
                    上傳紀錄
                </Button>
            </div>
            <InBodyChart />
        </div>
    );
}
