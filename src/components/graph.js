import * as React from "react";
import { Card, CardContent, TextField } from "@material-ui/core/";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab/";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Typography, Button } from "@material-ui/core/";
import { Animation } from "@devexpress/dx-react-chart";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    card: {
      backgroundColor: "transparent",
    },
    chart: {
      color: theme.palette.text.primary,
    },
    dateSelectorDiv: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    datepickerTextboxPalette: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.main,
      padding: '20px',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    },
  };
});

export default function GraphCard(props) {
  const chartData = props.data;
  const classes = useStyles();
  return (
    //todo: create clickevents for d/m/y buttons
    <Card elevation={0} className={classes.card}>
      <CardContent>
        <div className={classes.dateSelectorDiv}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Start Date"
              //value={value}
              onChange={(newValue) => {
                console.log(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              InputProps={{ className: classes.datepickerTextboxPalette }}
            />
            <DesktopDatePicker
              label="End Date"
              color="secondary"
              //value={value}
              onChange={(newValue) => {
                console.log(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              InputProps={{ className: classes.datepickerTextboxPalette }}
            />
          </LocalizationProvider>
        </div>
        <Chart
          data={chartData}
          className={classes.chart}
          height={window.innerHeight * 0.9}
        >
          <ArgumentAxis showGrid={false} showTicks={false} />
          <ValueAxis max={7} showGrid={false} />

          <BarSeries valueField="population" argumentField="year" />

          <Animation />
        </Chart>
      </CardContent>
    </Card>
  );
}