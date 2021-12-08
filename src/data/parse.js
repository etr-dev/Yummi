import { computeHeadingLevel } from "@testing-library/dom";
import Papa from "papaparse";
import { uploadFile } from "../data/database";
import axios from "axios";

//https://levelup.gitconnected.com/use-papa-parse-to-parse-a-csv-file-in-a-react-application-da570e0c346a

//Format should be something like:
//parsedData['DoubleCheeseburger']['10-23-2021'].count      ------>     28
/*

UPDATED FORMAT ----- as of 11/3/2021
parsedDate:
  items:
    Double Cheeseburger:
        Price: '2.59'       <---Price of the item
        Tax: '.18'          <---Tax of the item
        10-22-2021:
            Day: Friday                                 <---What Day of the week 10-22-2021
            Time: ['12:34', '12:50', '1:20',...]        <---All the times that double cheeseburgers sold on 10-22-2021
            Count: 34                                   <---Number of items sold on 10-22-2021
        10-23-2021:
            Day: Saturday                                   <---What Day of the week 10-23-2021
            Time: ['12:34', '12:50', '1:20',...]            <---All the times that double cheeseburgers sold on 10-23-2021
            Count: 28                                       <---Number of items sold on 10-23-2021    
  Dates:
    10-21-2021:
      Day: Thursday
      ItemsSold: 602
      Revenue:  7549.68     <---- total money made that day (you will have to convert the item's Price to float, it is currently a string)
    10-22-2021:
      Day: Friday
      ItemsSold: 708
      Revenue:  9659.41
    10-23-2021:
      Day: Saturday
      ItemsSold: 501
      Revenue:  5549.68
  Categories:
    Breakfast:[Pancakes,Hashbrown,Bacon Egg and Cheese Biscuit]   <--- list of all items that are in that category (make sure to get the keys dynamically do not hard code 'Breakfast' do element.Category or something)
    Value Meal: [Double CheeseBurger, Big Mac]
    Lunch: [Chicken Sandwhich]
*/

//in here we can begin parsing the data
//results.data returns a huge array of all of the data (check the console on browser after uploading to see)  https://prnt.sc/1xv1she   <---image example
function oldParser(data) {
  let parsedData = { items: {}, categories: { items: [] }, dates: {} };
  for (let i = 0; i < data.length; i++) {
    let element = data[i];
    if (element.ItemName == undefined)
      //if undefined then skip
      continue;

    //if a catergory has not been created then create it with an empty list
    if (!(element.Category in parsedData.categories))
      parsedData.categories[element.Category] = [];

    //if the itemname is not in parsed data yet then initialize it
    if (!(element.ItemName in parsedData.items)) {
      parsedData.items[element.ItemName] = {
        Price: element.Price,
        Tax: element.Tax,
        Category: element.Category,
        Count: 0,
      }; //initialize item
        parsedData.categories[element.Category].push(element.ItemName); //push the item name into it's specific category this will only happen once per itemname
        parsedData.categories.items.push(element.ItemName);
    }

    //if the date is not in parsed data Item yet then initialize it
    if (!(element.Date in parsedData.items[element.ItemName])) {
      parsedData.items[element.ItemName][element.Date] = {
        Day: element.Day,
        Time: [],
        Count: 0,
      };
    }

    //initialize empty date
    if (!(element.Date in parsedData.dates)) {
      parsedData.dates[element.Date] = {
        revenue: 0,
        //Time: [],
        Count: 0,
      };
    }

    parsedData.dates[element.Date].revenue += Number(element.Price); //add item price to revenue for that day.. convert to number with 2 decimal points
    parsedData.dates[element.Date].Count++; //increment date count

    parsedData.items[element.ItemName].Count++;
    parsedData.items[element.ItemName][element.Date].Time.push(element.Time);
    parsedData.items[element.ItemName][element.Date].Count++;
  }
  const dateKeys = Object.keys(parsedData.dates);
  for (let i = 0; i < dateKeys.length; i++) {
    parsedData.dates[dateKeys[i]].revenue =
      parsedData.dates[dateKeys[i]].revenue.toFixed(2);
  }
  return parsedData;
}

function newParser(data) {
  let parsedData = { items: {}, categories: {items: [], Daily: [], Categories: []}, dates: {} };

  for (let i = 0; i < data.length; i++) {
    let element = data[i];
    if (!element.ItemName) {
      //if undefined then skip or blank
      continue;
    }

    //if a catergory has not been created then create it with an empty list
    if (
      !(element.Category in parsedData.categories) &&
      (element.Category != undefined || element.Category != "") &&
      element.Category != "MISCELLANEOUS"
    )
      parsedData.categories[element.Category] = [];

    //if the itemname is not in parsed data yet then initialize it
    if (!(element.ItemName in parsedData.items)) {
      parsedData.items[element.ItemName] = {
        Category: element.Category,
        TotalRevenue: 0,
        Count: 0,
      }; //initialize item
      if (element.ItemName == element.Category) {
        parsedData.categories['Categories'].push(element.ItemName); //push the item name into it's specific category this will only happen once per itemname
      } else if (element.Category == 'MISCELLANEOUS') {
        parsedData.categories['Daily'].push(element.ItemName); //push the item name into it's specific category this will only happen once per itemname
      } else {
        parsedData.categories[element.Category].push(element.ItemName); //push the item name into it's specific category this will only happen once per itemname
        parsedData.categories.items.push(element.ItemName);
      }
    }

    //if the date is not in parsed data Item yet then initialize it
    if (!(element.Date in parsedData.items[element.ItemName])) {
      parsedData.items[element.ItemName][element.Date] = {
        Count: 0,
        revenue: 0, //Net Sales (money that this item has made per day)
        PercentOfRevenue: 0, //What percentage of total money made that day does this account for
        PercentOfCategory: 0, //Percent of items sold to account for total category quantity
        GuestOrderPercent: 0, //Percent of guest orders
      };
    }

    //initialize empty date
    if (!(element.Date in parsedData.dates)) {
      parsedData.dates[element.Date] = {
        revenue: 0, //Net Sales (money that this item has made per day)
        GuestCount: 0,
        Count: 0,
      };
    }

    if (element.ItemName == "Grand Total") {
      parsedData.dates[element.Date].revenue = Number(element["Net Sales"]); //add item price to revenue for that day.. convert to number with 2 decimal points
      parsedData.dates[element.Date].Count = Number(element.Count); //The date's items sold count is equal to the grand total for that day
    } else if (element.ItemName == "Guest Count") {
      parsedData.dates[element.Date].GuestCount = Number(element.Count); //add item price to revenue for that day.. convert to number with 2 decimal points
    }//Setup item stuff
    else {
        parsedData.items[element.ItemName][element.Date] = {
        revenue: Number(element["Net Sales"]), //Net Sales (money that this item has made per day)
        PercentOfRevenue: Number(element["% of Net Sales"]), //What percentage of total money made that day does this account for
        PercentOfCategory: Number(element["% of Category Qty Sold"]), //Percent of items sold to account for total category quantity
        GuestOrderPercent: Number(element["Guest Order %"]), //Percent of guest orders
        Count: Number(element["Count"]),
      };
      parsedData.items[element.ItemName].TotalRevenue += Number(
        element["Net Sales"]
      );
      //parsedData.items[element.ItemName].TotalRevenue = Number.parseFloat(parsedData.items[element.ItemName].TotalRevenue).toFixed(2)
      parsedData.items[element.ItemName].Count += Number(element["Count"]);
    }
  }
  const dateKeys = Object.keys(parsedData.dates);
  const itemKeys = Object.keys(parsedData.items);
  for (let i = 0; i < dateKeys.length; i++) {
    parsedData.dates[dateKeys[i]].revenue =
      parsedData.dates[dateKeys[i]].revenue.toFixed(2);
  }
  for (let i = 0; i < itemKeys.length; i++) {
    parsedData.items[itemKeys[i]].TotalRevenue =
      Number(parsedData.items[itemKeys[i]].TotalRevenue.toFixed(2));
  }
  console.log(parsedData);
  return parsedData;
}

function parseData(data) {
  let __parsedData = oldParser(data);
  let parsedData = newParser(data);
  return parsedData;
}

export const parseFileAndUpload = (file, email) => {
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      //Goals here: Parse data, send parsed data to DB
      const parsed = parseData(results.data);
      const partialRaw = results.data
        .slice(0, 50)
        .filter((value) => value.ItemName != ""); //SAVE THE FIRST 50 ROWS OF DATA TO DATABASE
      console.log(partialRaw);
      axios(uploadFile(email, file, parsed, partialRaw))
        .then((response) => {
          console.log(response);
          window.location.reload(true);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
  });
};
