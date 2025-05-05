export default function getFormattedLongDate(dateString: string): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date(dateString);
    const dayName = daysOfWeek[today.getDay()];
    const monthName = monthsOfYear[today.getMonth()];
    const day = today.getDate();

    return `${dayName}, ${monthName} ${day}`;
}
