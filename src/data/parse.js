import { computeHeadingLevel } from '@testing-library/dom'
import Papa from 'papaparse'

//https://levelup.gitconnected.com/use-papa-parse-to-parse-a-csv-file-in-a-react-application-da570e0c346a

//Format should be something like:
//parsedData['DoubleCheeseburger']['10-23-2021'].count      ------>     28
            /*
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
            Snack Wrap:
                Price: '2.59'       <---Price of the item
                Tax: '.18'          <---Tax of the item
                10-22-2021:
                    Day: Friday                                
                    Time: ['12:34', '12:50', '1:20',...]        
                    Count: 34                                   
                10-23-2021:
                    Day: Saturday                                   
                    Time: ['12:34', '12:50', '1:20',...]            
                    Count: 28                                       
            */

//in here we can begin parsing the data
//results.data returns a huge array of all of the data (check the console on browser after uploading to see)  https://prnt.sc/1xv1she   <---image example
function parseData(data) {
    console.log(data)
}

export const parseFile = file => {
    Papa.parse(file, {
        header: true,
        complete: results => {
            //Goals here: Parse data, send parsed data to DB
            parseData(results.data)
        }
    })
}