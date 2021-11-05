export function inDateRange(day, start, end) {
    if (day > start && day < end)
        return true;
    else
        return false;
}

export const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();