import { Button } from '@nextui-org/react';
interface PropsButton {
    size: 'sm' | 'md' | 'lg' | undefined;
    radius: 'sm' | 'md' | 'lg' | 'none' | 'full' | undefined;
    variant:
        | 'solid'
        | 'bordered'
        | 'light'
        | 'flat'
        | 'faded'
        | 'shadow'
        | 'ghost'
        | undefined;
    children: any;
    onClick: () => void;
}
export default function ButtonBlack({
    size,
    radius,
    variant,
    children,
    onClick,
}: PropsButton) {
    return (
        <Button
            className="w-full bg-default-900 font-bold text-white"
            size={size}
            radius={radius}
            variant={variant}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
export function ButtonDefault({
    size,
    radius,
    variant,
    children,
    onClick,
}: PropsButton) {
    return (
        <Button
            className="w-full font-bold"
            color="default"
            size={size}
            radius={radius}
            variant={variant}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
