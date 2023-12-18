import { Avatar, Button, Input, RadioGroup, User } from '@nextui-org/react';
import { useEffect } from 'react';
import { useUserStore } from '../../stores/UserStore';
export default function Profile() {
    useEffect(() => {
        getCoachList();
    }, []);
    const {
        signUpRole,
        signUpName,
        selectRole,
        setInputTextToState,
        setSignUpCoach,
        coachList,
        signUpWithCoach,
        getCoachList,
        sendInvitation,
        coachReserve,
        coachCalender,
        currentUserImg,
        currentUserName,
        myCoachName,
        updateProfile,
    } = useUserStore();
    return (
        <>
            <User
                name={currentUserName}
                description={
                    signUpWithCoach.state === 'accept'
                        ? `我的教練: ${myCoachName}`
                        : signUpWithCoach.state === 'waiting'
                          ? `等待${myCoachName}教練回覆`
                          : signUpWithCoach.state === 'reject'
                            ? '教練拒絕'
                            : '還沒有申請教練'
                }
                avatarProps={{
                    src: `${currentUserImg ? currentUserImg : ''}`,
                    className: 'w-20 h-20 text-large',
                }}
            />
            <div className="myChartContainer p-1 flex">
                <Avatar
                    src={currentUserImg ? currentUserImg : ''}
                    color="default"
                    size="lg"
                    className="border-2 border-yellow-300 h-20 w-20 text-large mr-2"
                />
                <p className="text-2xl ">{currentUserName}</p>
            </div>

            <Input
                isRequired
                type="text"
                label="Name"
                id="signUpName"
                className="max-w-xs"
                onChange={(e) => {
                    setInputTextToState(e.target.id, e.target.value);
                }}
            />
            <RadioGroup label="設定登入身分" orientation="horizontal">
                <input
                    name="role"
                    type="radio"
                    value="1"
                    onChange={(e) => {
                        selectRole(Number(e.target.value));
                    }}
                />
                Coach
                <input
                    name="role"
                    type="radio"
                    value="2"
                    onChange={(e) => {
                        selectRole(Number(e.target.value));
                    }}
                />
                Student
            </RadioGroup>
            {signUpRole === 1 ? (
                <>
                    <Input
                        isRequired
                        type="text"
                        label="Calender link"
                        id="coachCalender"
                        defaultValue=""
                        className="max-w-xs"
                        onChange={(e) => {
                            setInputTextToState(e.target.id, e.target.value);
                        }}
                    />
                    <Input
                        isRequired
                        type="text"
                        label="Reserve Link"
                        id="coachReserve"
                        defaultValue=""
                        className="max-w-xs"
                        onChange={(e) => {
                            setInputTextToState(e.target.id, e.target.value);
                        }}
                    />
                </>
            ) : null}
            {signUpRole === 2 ? (
                <select
                    value={signUpWithCoach.coachId}
                    onChange={(e) => {
                        setSignUpCoach(e.target.value);
                    }}
                    style={{ color: 'black' }}
                >
                    <option value={''} disabled>
                        Choose a Coach
                    </option>
                    {coachList.map((item, index): any => (
                        <option key={index} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                    ;
                </select>
            ) : null}
            <p></p>
            <Button
                size="md"
                onClick={async () => {
                    if (
                        signUpRole === 1 &&
                        signUpName &&
                        coachCalender &&
                        coachReserve
                    ) {
                        await updateProfile();
                    } else if (signUpRole === 2 && signUpName) {
                        await updateProfile();
                        sendInvitation(
                            signUpWithCoach.coachId,
                            localStorage.getItem('UID')!
                        );
                    } else {
                        alert('Plz fill in all the blanks');
                    }
                }}
            >
                Button
            </Button>
        </>
    );
}
