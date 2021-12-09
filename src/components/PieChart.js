import * as React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core/";
import {
  Chart,
  PieSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, EventTracker } from "@devexpress/dx-react-chart";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { drawerSelection } from "../data/Redux/Actions/index";
import {
  inDateRange,
  getDates,
  datesAreOnSameDay,
  getDateString,
  getSelectedData,
  dayOfWeek,
} from "../data/helpers";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    card: {
      backgroundColor: "transparent",
    },
    chart: {
      color: theme.palette.text.primary,
    },
    tooltip: {
      color: theme.palette.primary.main,
    },
    charts: {
      display: "flex",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      alignItems: "center",
      minHeight: "80vh",
    },
  };
});

export default function PieChart(props) {
  let chartData = [];
  let chart = <></>;
  const activeData = props.activeData;
  const classes = useStyles();
  const drawerSelection = useSelector((state) => state.drawer);
  const dateSelection = props.dates;
  const dateFormat = props.dateFormat;
  const pieSelection = props.pieSelection;
  const [chartSize, setChartSize] = React.useState(
    (window.innerWidth - window.innerWidth / 6) / 7 - 20
  );

  const dates = getDates(dateSelection.start, dateSelection.end);
  let titleText = "Select an Item";
  if (props.titleText) titleText = props.titleText;
  let missingData = false;

  //SETUP DATA TO BE PASSED TO THE CHART IF ALL VARIABLES HAVE BEEN SET
  if (dateSelection && activeData.dates != undefined) {
    //if none of the data is empty
    if (props.requireDrawerSelection && !drawerSelection) {
      console.log("no drawer selection");
    } else {
      console.log(activeData);
      chartData = {}; //clear data
      for (let i = 0; i < dates.length; i++) {
        const dateString = getDateString(dates[i]);
        if (dateString in activeData.dates) {
          //if the date is in the data
          chartData[dateString] = [];
          let tData = getSelectedData(
            "PieChart",
            activeData,
            dateString,
            drawerSelection
          )[pieSelection];

          if (tData == undefined) tData = 0;
          chartData[dateString].push({
            //push object onto chart data
            date: drawerSelection,
            data: tData,
          });
          chartData[dateString].push({
            //push object onto chart data
            date: "Remainder",
            data: Number((1 - chartData[dateString][0].data).toFixed(2)), //activeData[drawerSelection][str].Count,
          });
        } else {
          chartData.push({
            date: dateString,
            data: 0,
          });
          missingData = true;
        }
      }

      if (missingData) {
        titleText = titleText + "\t (missing data)";
      }
    }
  }

  console.log(chartData);
  React.useEffect(() => {
    setChartSize((window.innerWidth - window.innerWidth / 6) / 7 - 20);
    console.log(window.innerWidth);
  }, [window.innerWidth]);

  return (
    <div className={classes.container}>
      <Typography variant="h4" color='textSecondary'>{drawerSelection}</Typography>
      <Typography variant="h3">
        Percentage of {props.pieSelection} per day
      </Typography>
      <div className={classes.charts}>
        {Object.keys(chartData).length > 0 ? dates.map((date) => (
          <Chart
            data={chartData[getDateString(date)]}
            className={classes.chart}
            width={chartSize}
            height={chartSize}
          >
            <Title text={getDateString(date)} />
            <PieSeries valueField="data" argumentField="date" />
            <Animation />
          </Chart>
        )) : <></>}
      </div>

      {/* <div className={classes.dropdown}>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={pieSelection}
            label="Data Type"
            onChange={handleChange}
            defaultValue={pieSelection}
            displayEmpty
            className={classes.Select}
          >
            <MenuItem value="Category">
              <Typography
                variant="h6"
                color="TextSecondary"
                className={classes.selectText}
              >
                % of Category
              </Typography>
            </MenuItem>
            <MenuItem value="Revenue">
              <Typography
                variant="h6"
                color="TextSecondary"
                className={classes.selectText}
              >
                % of Revenue
              </Typography>
            </MenuItem>
            <MenuItem value="Guests">
              <Typography
                variant="h6"
                color="TextSecondary"
                className={classes.selectText}
              >
                % of Guest Orders
              </Typography>
            </MenuItem>
          </Select>
          <FormHelperText>Select display type</FormHelperText>
        </FormControl>
      </div> */}
    </div>
  );
}
