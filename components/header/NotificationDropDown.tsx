'use client';
import { IoNotificationsOutline } from 'react-icons/io5';
import { toast } from 'sonner';

export default function NotificationDropDown() {
    return (
        <>
            <button onClick={() => toast.success('bor')}>
                <IoNotificationsOutline size={25} />
            </button>
        </>
    );
}
