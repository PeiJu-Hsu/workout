import { Chip } from '@nextui-org/react';
import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { RecordStore } from '../../stores/RecordStore';
import { groupList } from '../../utils/TrainingItems';
// import './BodyComponent.css'

const Wrapper = styled.div`
    & {
        position: relative;
        height: 500px;
        display: block;
        width: 330px;

        @media (min-width: 640px) {
        }
    }

    & svg:hover {
        cursor: pointer;
    }
    & svg.disabled:hover {
        cursor: default;
    }
    & svg.disabled:hover path {
        fill: #a3b2b3;
    }

    & svg:hover path {
        fill: #f9c809;
    }
    & svg.selected path {
        fill: #f9c809;
    }

    & svg {
        position: absolute;
        left: 30%;
        fill: #a3b2b3;
    }

    & svg#head {
        margin-left: -28.5px;
        top: -6px;
    }

    & svg#shoulder {
        margin-left: -53.5px;
        top: 69px;
    }
    & svg#back {
        margin-left: 80px;
        top: 69px;
    }
    & svg#arm {
        margin-left: -78px;
        top: 112px;
    }
    & svg#chest {
        margin-left: -43.5px;
        top: 88px;
    }
    & svg#stomach {
        margin-left: -37.5px;
        top: 130px;
    }
    & svg#leg {
        margin-left: -46.5px;
        top: 205px;
    }
    & svg#leftHand {
        margin-left: -102.5px;
        top: 224px;
    }

    & svg#rightHand {
        margin-left: 66.5px;
        top: 224px;
    }

    & svg#leftFoot {
        margin-left: -38.5px;
        top: 455px;
    }

    & svg#rightFoot {
        margin-left: 5.5px;
        top: 455px;
    }
    & svg#legBackside {
        margin-left: 127px;
        top: 210px;
    }
    & svg#footBackSide {
        margin-left: 132px;
        top: 460px;
    }
    & svg#headBackSide {
        margin-left: 145px;
        top: -6px;
    }
`;

export const SVG_PARTS: Array<string> = [
    'head',
    'shoulder',
    'arm',
    'chest',
    'stomach',
    'leg',
    'leftHand',
    'rightHand',
    'leftFoot',
    'rightFoot',
];

export interface PartsGroups {
    head: { head: boolean };
    trunk: {
        shoulder: boolean;
        arm: boolean;
        chest: boolean;
        stomach: boolean;
    };
    legs: { leg: boolean };
    hands: { rightHand: boolean; leftHand: boolean };
    foots: { leftFoot: boolean; rightFoot: boolean };
}

export interface PartsInput {
    head: PartSelect;
    shoulder: PartSelect;
    arm: PartSelect;
    chest: PartSelect;
    stomach: PartSelect;
    leg: PartSelect;
    rightHand: PartSelect;
    leftHand: PartSelect;
    leftFoot: PartSelect;
    rightFoot: PartSelect;
}

export interface PartsModel {
    head?: JSX.Element;
    neck?: JSX.Element;
    shoulder?: JSX.Element;
    arm?: JSX.Element;
    chest?: JSX.Element;
    stomach?: JSX.Element;
    leg?: JSX.Element;
    rightHand?: JSX.Element;
    leftHand?: JSX.Element;
    leftFoot?: JSX.Element;
    rightFoot?: JSX.Element;
    back?: JSX.Element;
    legBackside?: JSX.Element;
    footBackSide?: JSX.Element;
    headBackSide?: JSX.Element;
}

export interface BodyComponentProps {
    onClick?: (id: string) => void;
    onChange?: (parts: PartsInput) => void;
    partsInput?: PartsInput;
    bodyModel?: string;
}

export interface PartSelect {
    selected?: boolean;
    show?: boolean;
}

const MaleBodyModel: PartsModel = {
    head: (
        <path d="M 49.432 37.702 L 51.958 20.638 L 28.531 5.896 L 4.949 21.448 L 7.485 38.074 L 4.85 38.591 L 6.312 49.381 L 11.52 51.947 L 13.88 63.577 L 23.6 74.595 L 34.456 74.271 L 44.016 63.901 L 45.934 51.949 L 50.99 50.592 L 52.181 39.262 L 49.432 37.702 Z"></path>
    ),
    neck: (
        <path d="M 41.206 66.384 L 17.293 66.688 L 14.836 71.529 L 19.676 87.129 L 30.244 95.034 L 39.498 87.654 L 43.818 71.655 L 41.206 66.384 Z"></path>
    ),
    shoulder: (
        <>
            <path d="M 38.244 -0.004 L 40.224 9.228 L 28.571 12.085 L 18.502 30.932 L 8.575 36.462 L 0.132 46.755 L 0.219 22.23 L 12.835 8.29 L 19.606 9.571 L 38.244 -0.004 Z"></path>
            <path d="M 70.276	-0.004 L 68.296	9.228	L	78.877 12.475	L	89.083 31.131 L	101.053	36.518 L 109.201 47.802	L	108.18 22.506	L	95.53	8.516	L	86.394 8.766 L 70.276 -0.004 Z"></path>
        </>
    ),
    back: (
        <>
            <path d="M 46.62 0 L 44.1 2.52 L 26.46 10.08 L 36.54 18.9 L 42.84 46.62 L 63 70.56 L 63 0 L 46.62 0 Z"></path>
            <path d="M 74.34 0 L 74.34 70.56 L 94.5 46.62 L 100.8 18.9 L 110.88 10.08 L 93.24 2.52 L 90.72 0 L 74.34 0 Z"></path>
            <path d="M 27.09 15.12 L 21.42 32.76 L 21.42 52.92 L 34.02 93.24 L 63 84.42 L 65.52 79.38 L 39.06 47.88 L 35.28 23.94 L 27.09 15.12 Z"></path>
            <path d="M 103.95 20.79 L 96.39 49.77 L 73.71 75.6 L 73.71 84.42 L 103.32 93.24 L 114.66 50.4 L 115.92 37.8 L 108.99 15.75 L 103.95 20.79 Z"></path>
            <path d="M 34.65 97.02 L 36.54 109.62 L 66.15 149.94 L 63 112.14 L 63 88.2 L 34.65 97.02 Z"></path>
            <path d="M 73.08 88.2 L 74.34 112.14 L 69.93 149.94 L 100.8 109.62 L 102.06 98.784 L 73.08 88.2 Z"></path>
        </>
    ),
    arm: (
        <>
            <path d="M 17.229 50.062 L 18.682 43.737 L 16.442 16.358 L 33.128 0.155 L 39.953 9.973 L 29.237 79.632 L 10.364 119.167 L -0.977 115.813 L 6.654 77.532 L 17.229 50.062 Z"></path>
            <path d="M 122.186 57.362 L 116.01 10.154 L 123.047 0.015 L 134.284 8.364 L 138.997 18.252 L 137.226 43.483 L 149.91 77.03 L 156.918 112.541 L 151.761 118.994 L 145.43 118.465 L 127.079 79.559 L 122.186 57.362 Z"></path>
        </>
    ),
    chest: (
        <path d="M 19.32 0 L 9.58 14.601 L -0.005 21.544 L 6.145 26.38 L 10.977 40.45 L 22.177 45.066 L 38.91 36.349 L 46.11 36.037 L 64.211 45.157 L 75.21 40.048 L 79.956 26.138 L 87.048 21.573 L 76.817 14.103 L 66.985 0.152 L 51.079 1.833 L 48.807 5.171 L 36.261 5.483 L 34.051 1.394 L 19.32 0 Z"></path>
    ),
    stomach: (
        <path d="M 15.988 6.215 L 0.765 1.373 L 8.471 30.123 L 6.866 55.306 L 0.057 67.982 L 10.522 82.302 L 36.246 107.323 L 38.8 107.227 L 65.182 83.078 L 75.754 68.424 L 68.905 55.361 L 66.776 30.912 L 74.336 2.311 L 55.921 6.748 L 39.102 0.128 L 34.984 0.264 L 15.988 6.215 Z"></path>
    ),
    leg: (
        <>
            <path d="M 34.822 170.168 L 35.794 164.644 L 36.888 158.794 L 39.264 152.9 L 34.561 129.077 L 39.58 87.961 L 43.599 36.561 L 10.799 0.928 L 0.232 30.113 L 5.641 63.554 L 4.668 89.142 L 11.542 121.956 L 10.806 159.345 L 9.017 195.132 L 16.544 224.793 L 22.674 252.725 L 30.692 253.507 L 33.937 215.649 L 38.807 201.895 L 39.47 186.808 L 34.822 170.168 Z"></path>
            <path d="M 82.308 1.138 L 49.595 32.897 L 52.199 87.843 L 56.051 128.404 L 53.559 134.166 L 52.78 153.519 L 57.418 161.961 L 56.838 170.375 L 53.001 186.538 L 53.695 201.551 L 58.359 215.894 L 57.982 257.679 L 69.301 252.703 L 84.543 194.712 L 80.595 162.705 L 80.401 129.906 L 78.401 125.278 L 88.239 89.299 L 88.455 61.267 L 91.818 30.666 L 82.308 1.138 Z"></path>
        </>
    ),
    rightHand: (
        <path d="M 15.281 0.317 L 9.85 6.26 L 1.651 8.339 L 1.305 19.734 L 6.477 37.003 L 9.036 36.995 L 7.405 26.637 L 8.8 26.553 C 8.8 26.553 14.545 38.621 14.221 38.621 L 16.914 38.069 L 13.896 25.545 L 14.948 25.174 L 22.308 38.398 L 25.673 37.74 L 21.074 24.172 L 21.898 23.56 L 31.127 35.891 L 33.934 33.745 L 23.755 11.12 L 33.214 16.208 L 35.792 12.06 L 27.263 4.38 L 15.281 0.317 Z"></path>
    ),
    leftHand: (
        <path d="M 21.893 1.486 L 27.006 7.43 L 34.992 8.871 L 32.786 21.329 L 28.465 37.109 L 25.906 37.527 L 25.942 26.637 L 24.121 26.34 L 20.721 38.408 L 17.921 37.644 L 19.769 25.545 L 18.824 25.174 L 12.102 37.76 L 9.056 36.89 L 13.974 23.747 L 13.575 23.347 L 4.346 34.19 L 1.008 32.363 L 12.081 12.581 L 11.506 11.545 L 0.665 14.72 L -1.914 10.998 L 21.893 1.486 Z"></path>
    ),
    leftFoot: (
        <path d="M 2.167 22.595 L 14.491 2.905 L 22.295 3.398 L 26.954 7.665 L 23.162 33.553 L 18.986 33.71 L 17.194 25.729 L 16.559 31.003 L 15.009 31.095 L 13.441 25.263 L 12.93 30.591 L 10.683 29.829 L 9.88 24.825 L 9.052 29.4 L 6.436 29.455 L 6.018 24.163 L 5.097 29.251 L 2.073 28.438 L 2.167 22.595 Z"></path>
    ),
    rightFoot: (
        <path d="M 6.378 3.485 L 6.18 26.763 L 7.958 33.198 L 11.794 33.082 L 11.963 27.717 L 13.86 32.134 L 15.962 31.932 L 15.795 27.255 L 18.39 31.123 L 20.696 30.607 L 19.257 26.201 L 23.069 29.834 L 24.706 29.107 L 23.997 24.581 L 26.322 27.261 L 27.578 25.159 L 20.436 6.313 L 13.535 1.527 L 6.378 3.485 Z"></path>
    ),
    legBackside: (
        <>
            <path d="M 34.822 170.168 L 35.794 164.644 L 36.888 158.794 L 39.264 152.9 L 34.561 129.077 L 39.58 87.961 L 43.599 36.561 L 10.799 0.928 L 0.232 30.113 L 5.641 63.554 L 4.668 89.142 L 11.542 121.956 L 10.806 159.345 L 9.017 195.132 L 16.544 224.793 L 22.674 252.725 L 30.692 253.507 L 33.937 215.649 L 38.807 201.895 L 39.47 186.808 L 34.822 170.168 Z"></path>
            <path d="M 82.308 1.138 L 49.595 32.897 L 52.199 87.843 L 56.051 128.404 L 53.559 134.166 L 52.78 153.519 L 57.418 161.961 L 56.838 170.375 L 53.001 186.538 L 53.695 201.551 L 58.359 215.894 L 57.982 257.679 L 69.301 252.703 L 84.543 194.712 L 80.595 162.705 L 80.401 129.906 L 78.401 125.278 L 88.239 89.299 L 88.455 61.267 L 91.818 30.666 L 82.308 1.138 Z"></path>
        </>
    ),
    footBackSide: (
        <>
            <path d=" M 15.491 3.905 L 26.954 3.905  L 29.95 29 L 12.491 29 L 15.491 2.905Z"></path>
            <path d="M 54.378 3.905 L 65.8 3.905 L 68.8 29 L 51.3 29 L 54.378 3.905  Z"></path>
        </>
    ),
    headBackSide: (
        <path d="M 49.432 37.702 L 51.958 20.638 L 28.531 5.896 L 4.949 21.448 L 11.52 51.947 L 13.88 63.577 L 23.6 63.577 L 34.456 63.577 L 44.016 63.901 L 45.934 51.949 L 49.432 37.702 Z"></path>
    ),
};

export const BodyComponent: React.FC<BodyComponentProps> = ({
    onClick,
    onChange,
    partsInput,
}) => {
    const { setItemGroup, setItemGroupIndex, setItemName } = RecordStore();
    const partsInputInitial = {
        head: { selected: false },
        shoulder: { selected: false },
        back: { selected: false },
        arm: { selected: false },
        chest: { selected: false },
        stomach: { selected: false },
        leg: { selected: false },
        rightHand: { selected: false },
        leftHand: { selected: false },
        leftFoot: { selected: false },
        rightFoot: { selected: false },
        legBackside: { selected: false },
        footBackSide: { selected: false },
        headBackSide: { selected: false },
    };

    partsInput = {
        ...partsInputInitial,
        ...partsInput,
    };

    const [parts, setParts] = useState<PartsInput>(partsInput);

    const setValue = function (value: boolean | PartSelect): PartSelect {
        if (value === true || value === false) {
            value = { selected: !value };
        } else if (value) {
            value.selected = !value.selected;
        } else {
            value = { selected: true };
        }
        return value;
    };

    const onClickSvg: MouseEventHandler = (event): void => {
        if (!event.target || !(event.target instanceof Element)) {
            return;
        }
        const target: Element = event.target;
        const id = target.id || target.parentElement?.id;
        if (!id) {
            return;
        }

        let property: keyof typeof parts;
        for (property in parts) {
            if (
                id !== property ||
                (parts[property] && parts[property].show === false)
            ) {
                parts[property].selected = false;
                continue;
            }
            parts[property] = setValue(parts[property]);
        }

        const partsChanged = { ...parts };

        setItemGroup((event.currentTarget as HTMLElement).dataset.group);
        setItemGroupIndex(
            groupList.indexOf(
                (event.currentTarget as HTMLElement).dataset.group!
            )
        );
        setItemName('default');
        setParts(partsChanged);
        if (onChange) onChange(partsChanged);
        if (onClick) onClick(id);
        event.currentTarget.scroll({
            top: event.currentTarget.scrollHeight,
            behavior: 'smooth',
        });
    };

    const svgElements = {
        render: (): Array<JSX.Element> => {
            let property: keyof typeof parts;
            const elements: Array<JSX.Element> = [];
            for (property in parts) {
                if (parts[property] && parts[property].show === false) {
                    continue;
                }
                const svg = svgElements[property];
                const selected: boolean = parts[property].selected
                    ? true
                    : false;
                elements.push(svg(selected));
            }
            return elements;
        },
        head: function head(): JSX.Element {
            return (
                <svg
                    className="disabled"
                    data-position="head"
                    key="head"
                    id="head"
                    xmlns="http://www.w3.org/2000/svg"
                    width="56.594"
                    height="95.031"
                    viewBox="0 0 56.594 95.031"
                >
                    {MaleBodyModel.head}
                </svg>
            );
        },
        back: function back(selected: boolean): JSX.Element {
            return (
                <svg
                    onClick={onClickSvg}
                    data-position="back"
                    data-group="背"
                    key="back"
                    id="back"
                    className={(selected ? 'selected ' : '') + 'back'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="160"
                    height="170"
                    viewBox="0 0 110 160"
                >
                    {MaleBodyModel.back}
                </svg>
            );
        },
        shoulder: function shoulder(selected: boolean): JSX.Element {
            return (
                <svg
                    onClick={onClickSvg}
                    data-position="shoulder"
                    data-group="肩"
                    key="shoulder"
                    id="shoulder"
                    className={(selected ? 'selected ' : '') + 'shoulder'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="109.532"
                    height="46.594"
                    viewBox="0 0 109.532 46.594"
                >
                    {MaleBodyModel.shoulder}
                </svg>
            );
        },
        arm: function arm(selected: boolean): JSX.Element {
            return (
                <svg
                    onClick={onClickSvg}
                    data-position="arm"
                    data-group="手臂"
                    key="arm"
                    id="arm"
                    className={(selected ? 'selected ' : '') + 'arm'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="156.344"
                    height="119.25"
                    viewBox="0 0 156.344 119.25"
                >
                    {MaleBodyModel.arm}
                </svg>
            );
        },
        chest: function chest(selected: boolean): JSX.Element {
            return (
                <svg
                    onClick={onClickSvg}
                    data-position="chest"
                    data-group="胸"
                    key="chest"
                    id="chest"
                    className={(selected ? 'selected ' : '') + 'chest'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="86.594"
                    height="45.063"
                    viewBox="0 0 86.594 45.063"
                >
                    {MaleBodyModel.chest}
                </svg>
            );
        },
        stomach: function stomach(selected: boolean): JSX.Element {
            return (
                <svg
                    onClick={onClickSvg}
                    data-position="stomach"
                    data-group="腹"
                    key="stomach"
                    id="stomach"
                    className={(selected ? 'selected ' : '') + 'stomach'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="75.25"
                    height="107.594"
                    viewBox="0 0 75.25 107.594"
                >
                    {MaleBodyModel.stomach}
                </svg>
            );
        },
        leg: function leg(selected: boolean): JSX.Element {
            return (
                <svg
                    onClick={onClickSvg}
                    data-position="leg"
                    data-group="腿"
                    key="leg"
                    id="leg"
                    className={(selected ? 'selected ' : '') + 'leg'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="93.626"
                    height="250.625"
                    viewBox="0 0 93.626 250.625"
                >
                    {MaleBodyModel.leg}
                </svg>
            );
        },
        legBackside: function legBackside(selected: boolean): JSX.Element {
            return (
                <svg
                    onClick={onClickSvg}
                    data-position="legBackside"
                    data-group="腿"
                    key="legBackside"
                    id="legBackside"
                    className={(selected ? 'selected ' : '') + 'leg'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="93.626"
                    height="250.625"
                    viewBox="0 0 93.626 250.625"
                >
                    {MaleBodyModel.legBackside}
                </svg>
            );
        },

        leftHand: function leftHand(): JSX.Element {
            return (
                <svg
                    className="disabled"
                    data-position="leftHand"
                    key="leftHand"
                    id="leftHand"
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="38.938"
                    viewBox="0 0 90 38.938"
                >
                    {MaleBodyModel.leftHand}
                </svg>
            );
        },
        rightHand: function rightHand(): JSX.Element {
            return (
                <svg
                    data-position="rightHand"
                    key="rightHand"
                    id="rightHand"
                    className="disabled"
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="38.938"
                    viewBox="0 0 90 38.938"
                >
                    {MaleBodyModel.rightHand}
                </svg>
            );
        },
        leftFoot: function leftFoot(): JSX.Element {
            return (
                <svg
                    data-position="leftFoot"
                    key="leftFoot"
                    id="leftFoot"
                    className="disabled"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                >
                    {MaleBodyModel.leftFoot}
                </svg>
            );
        },
        rightFoot: function rightFoot(): JSX.Element {
            return (
                <svg
                    data-position="rightFoot"
                    key="rightFoot"
                    id="rightFoot"
                    className="disabled"
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="38.938"
                    viewBox="0 0 90 38.938"
                >
                    {MaleBodyModel.rightFoot}
                </svg>
            );
        },
        footBackSide: function footBackSide(): JSX.Element {
            return (
                <svg
                    data-position="footBackSide"
                    key="footBackSide"
                    id="footBackSide"
                    className="disabled"
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="38.938"
                    viewBox="0 0 90 38.938"
                >
                    {MaleBodyModel.footBackSide}
                </svg>
            );
        },
        headBackSide: function headBackSide(): JSX.Element {
            return (
                <svg
                    data-position="headBackSide"
                    key="headBackSide"
                    id="headBackSide"
                    className="disabled"
                    xmlns="http://www.w3.org/2000/svg"
                    width="56.594"
                    height="95.031"
                    viewBox="0 0 56.594 95.031"
                >
                    {MaleBodyModel.headBackSide}
                </svg>
            );
        },
    };

    return (
        <div>
            <Wrapper>{svgElements.render()}</Wrapper>
            <div className="w-full">
                <Chip
                    color="warning"
                    variant="flat"
                    className=" sticky px-2 left-16"
                >
                    正面
                </Chip>
                <Chip
                    color="warning"
                    variant="flat"
                    className=" sticky px-2 left-60"
                >
                    背面
                </Chip>
            </div>
        </div>
    );
};
