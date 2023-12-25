import InputText from '../../components/InputText';
export default function CoachURLInput() {
    return (
        <div className="flex flex-col gap-y-2">
            <InputText
                className={{
                    label: 'text-white',
                    input: 'text-white',
                    description: 'text-white',
                }}
                id={'coachCalender'}
                type={'url'}
                label={'Google日曆 URL'}
            />
            <InputText
                className={{
                    label: 'text-white',
                    input: 'text-white',
                    description: 'text-white',
                }}
                id={'coachReserve'}
                type={'url'}
                label={'Google預約表 URL'}
            />
        </div>
    );
}
