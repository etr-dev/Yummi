import axios from "axios";
import { deleteFile, findFileByFilename, findUser } from "../data/database";

export function inDateRange(day, start, end) {
  if (datesAreOnSameDay(day, start) || datesAreOnSameDay(day, end)) return true;
  if (day > start && day < end) return true;
  else return false;
}

export const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export const dayOfWeek = (date) => {
  if (typeof(date) == 'string') {
    date = new Date(date)
  }

  const weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[ 6 ] = "Saturday";
  
  return weekday[date.getDay()]
}
  

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export function getDateString(date) {
  let MM = date.getMonth() + 1
  let DD = date.getDate()
  const YYYY = date.getFullYear()

  if (DD < 10) DD = '0' + DD;
  if (MM < 10) MM = '0' + MM;

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

export function getMinMaxDate(dates) {
  if (typeof (dates[ 0 ]) == 'string') {
    for (let i = 0; i < dates.length; i++){
      dates[i] = new Date(dates[i])
    }
  }

  const maxDate = new Date(Math.max.apply(null, dates));
  const minDate = new Date(Math.min.apply(null, dates));
  
  return { start: minDate, end: maxDate }
}

export function menuFunction(choice, entry, email) {
  if (typeof (choice) === 'string')
    choice = choice.toUpperCase();
  switch (choice) {
    case "COPY":
      navigator.clipboard.writeText(entry);
      break;
    
    
    
    case "LOG DATA":
      axios(findUser(email)).then((res) => {
        console.log(res.data[ 0 ].files[ findFileByFilename(res.data[ 0 ], entry) ].parsedData)
      })
        .catch((error) => {
          console.error("Error: ", error);
        });
      break;
    
    
    
    case "DELETE":
      axios(deleteFile(email, entry))
        .then((res) => {
          console.log(res);
          window.location.reload(true)
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
      break;
    
    
    
    default:
      console.log('default switch statement')
  }
}

export function getSelectedData(choice, activeData, dateString, drawerSelection) {
  //temp
  let data = undefined

  //Any switch case that isn't activeData.dates must have a check to see if dateString exists like ----> if (dateString in activeData[ 'items' ][ drawerSelection ])
  switch (choice) {
    case 'ITEM_COUNT':
      if (drawerSelection) {
        if (dateString in activeData[ 'items' ][ drawerSelection ])
          data = activeData[ 'items' ][ drawerSelection ][ dateString ].Count;
      }
      break;
    case 'ITEM_REVENUE':
      break;
    case 'DATE_COUNT':
      data = activeData[ 'dates' ][ dateString ].Count;
      break;
    case 'DATE_REVENUE':
      data = parseInt(activeData[ 'dates' ][ dateString ].revenue);
      break;
    default:
      break;
  }
  
  if (data === undefined)
    return 0
  
  return data
}
