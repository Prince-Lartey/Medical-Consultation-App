export function formatDateOfBirth(isoDate: string): string {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();

    // Get ordinal suffix
    const getOrdinal = (n: number): string => {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
}
