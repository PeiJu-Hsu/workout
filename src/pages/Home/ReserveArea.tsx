import { useUserStore } from '../../stores/UserStore';

export default function ReserveArea() {
    const currentUserRole = useUserStore((state) => state.currentUserRole);
    const calenderURL = useUserStore((state) => state.calenderURL);
    const reserveURL = useUserStore((state) => state.reserveURL);
    const iframeSrc = () => {
        if (calenderURL && currentUserRole === 1) return calenderURL;
        if (reserveURL && currentUserRole === 2) return reserveURL;
    };
    if (!calenderURL && !reserveURL) return null;

    return (
        <iframe
            className="mt-2 h-[400px] w-full rounded-[10px] bg-white"
            src={iframeSrc()}
        ></iframe>
    );
}
