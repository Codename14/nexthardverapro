import { useTranslations } from 'next-intl';

export default function CalculateTimeAgo({ date, className }: { date: Date; className?: string }) {
    const t = useTranslations('Messages');
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    let message: string;
    if (minutes < 60) {
        message = minutes === 0 ? t('now') : `${minutes} ${t('minute')}`;
    } else if (hours < 24) {
        message = `${hours} ${t('hour')}`;
    } else {
        message = `${days} ${t('day')}`;
    }

    return <p className={className}>{message}</p>;
}
