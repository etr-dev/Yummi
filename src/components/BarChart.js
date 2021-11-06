import * as React from "react";
import { Card, CardContent, TextField } from "@material-ui/core/";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { drawerSelection } from "../data/Redux/Actions/index";
import { inDateRange } from "../data/helpers";

const useStyles = makeStyles((theme) => {
  return {
    container: {
    },
    card: {
      backgroundColor: "transparent",
    },
    chart: {
      color: theme.palette.text.primary,
    },
  };
});

export default function BarChart(props) {
  let chartData = [];
  let chart = <></>;
  const activeData = props.activeData;
  const classes = useStyles();
  const drawerSelection = useSelector((state) => state.drawer);
  const dateSelection = useSelector((state) => state.date);

  //SETUP DATA TO BE PASSED TO THE CHART IF ALL VARIABLES HAVE BEEN SET
  if (dateSelection && drawerSelection && activeData) {
    //if none of the data is empty
    chartData = []; //clear data
    let keys = Object.keys(activeData[drawerSelection]); //get all of the dates from the Active data where the selected item was sold
    for (let i = 0; i < keys.length; i++) {
      //loop through all of the dates where items sold
      const day = new Date(keys[i]); //parse date string to a Date object
      if (
        inDateRange(day, dateSelection.start, dateSelection.end) && //if the date is in range of the start and end dates the user selected and not null push object to chartData
        !isNaN(day.getTime())
      ) {
        chartData.push({
          //push object onto chart data
          date: keys[i],
          count: activeData[drawerSelection][keys[i]].Count,
        });
      }
    }
  }

  return (
    <div className={classes.container}>
          <Chart
            data={chartData}
            className={classes.chart}
            height={window.innerHeight * 0.9}
          >
            <ArgumentAxis showGrid={false} showTicks={false} />
            <ValueAxis max={7} showGrid={false} />

            <BarSeries valueField="count" argumentField="date" />

            <Animation />
          </Chart>
    </div>
  );
}
