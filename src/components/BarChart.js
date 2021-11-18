import * as React from "react";
import { Card, CardContent, TextField, Typography } from "@material-ui/core/";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
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
} from "../data/helpers";

const useStyles = makeStyles((theme) => {
  return {
    container: {},
    card: {
      backgroundColor: "transparent",
    },
    chart: {
      color: theme.palette.text.primary,
    },
    tooltip: {
      color: theme.palette.primary.main,
    },
  };
});

export default function BarChart(props) {
  let chartData = [];
  let chart = <></>;
  const activeData = props.activeData.items;
  const classes = useStyles();
  const drawerSelection = useSelector((state) => state.drawer);
  const dateSelection = props.dates;
  
  let titleText = "Select an Item";
  let missingData = false;
  if (dateSelection && drawerSelection && activeData) {
    titleText =
      drawerSelection +
      " sold between " +
      (parseInt(dateSelection.start.getMonth()) + 1) +
      "/" +
      dateSelection.start.getDate() +
      " and " +
      (parseInt(dateSelection.end.getMonth()) + 1) +
      "/" +
      dateSelection.end.getDate();
  }

  //SETUP DATA TO BE PASSED TO THE CHART IF ALL VARIABLES HAVE BEEN SET
  if (dateSelection && drawerSelection && activeData != undefined) {
    //if none of the data is empty   
    chartData = []; //clear data
    const dates = getDates(dateSelection.start, dateSelection.end);
    for (let i = 0; i < dates.length; i++) {
      const str = getDateString(dates[i]);
      if (str in activeData[drawerSelection]) {
        chartData.push({
          //push object onto chart data
          date: str,
          count: activeData[drawerSelection][str].Count,
        });
      } else {
        chartData.push({
          date: str,
          count: 0,
        });
        missingData = true;
      }
    }

    if (missingData) {
      titleText = titleText + "\t (missing data)";
    }
  }

  return (
    <div className={classes.container}>
      <Chart
        data={chartData}
        className={classes.chart}
        height={window.innerHeight * 0.9}
      >
        <Title text={titleText} />
        <ArgumentAxis showGrid={false} showTicks={false} />
        <ValueAxis showGrid={false} />

        <BarSeries valueField="count" argumentField="date" />
        <Animation />
      </Chart>
    </div>
  );
}
