import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
export default function DirectToInbody() {
    const navigate = useNavigate();
    return (
        <div className=" w-full text-center absolute top-24">
            <h2 className="text-2xl font-bold mb-1">尚無InBody數據</h2>
            <Button
                className="block text-base font-semibold m-auto"
                color="default"
                variant="shadow"
                onClick={() => {
                    navigate('/inbody');
                }}
            >
                前往填寫
            </Button>
        </div>
    );
}
