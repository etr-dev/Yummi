export function inDateRange(day, start, end) {
  if (datesAreOnSameDay(day, start) || datesAreOnSameDay(day, end)) return true;
  if (day > start && day < end) return true;
  else return false;
}

export const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export function getDateString(date) {
  const MM = date.getMonth() + 1
  const DD = date.getDate()
  const YYYY = date.getFullYear()
  return MM + '-' + DD + '-' + YYYY
}

export function getDates(start, end) {
  var dateArray = new Array();
  var currentDate = start;
  while (currentDate <= end) {
      dateArray.push(new Date (currentDate));
      currentDate = currentDate.addDays(1);
  }
  return dateArray;
}