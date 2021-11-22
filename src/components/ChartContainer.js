import * as React from "react";
import { Card, CardContent, TextField } from "@material-ui/core/";
import { LocalizationProvider, DesktopDatePicker, PickersDay } from "@mui/lab/";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { datesAreOnSameDay, inDateRange, getMinMaxDate } from "../data/helpers";
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
import { useDispatch } from "react-redux";
import BarChart from "./BarChart.js";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      height: "100vh",
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
      padding: "20px",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
    },
    highlightedDay: {
      color: `${theme.palette.text.primary} !important`,
      backgroundColor: `${theme.palette.info.main} !important`,
    },
    selectedDay: {
      border: `1px solid ${theme.palette.info.main} !important`,
      color: `${theme.palette.text.primary} !important`,
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    errorDays: {
      color: `${theme.palette.primary.main} !important`,
      backgroundColor: `red !important`,
    },
    graphContainer: {
      height: "100vh",
    },
  };
});

export default function ChartContainer(props) {
  //setup props
  const chartData = props.data;

  //library variables
  const classes = useStyles();
  const dispatch = useDispatch();
  
  //state variables
  const [start, setStart] = React.useState(new Date());
  const [ end, setEnd ] = React.useState(new Date());
  
  //set state variables
  React.useEffect(() => {
    if (props.activeData.dates != undefined) {
      const minMaxDate = getMinMaxDate(Object.keys(props.activeData.dates))
      setStart(minMaxDate.start);
      setEnd(minMaxDate.end);
    }
  },[props.activeData])

  return (
    //todo: create clickevents for d/m/y buttons
    <Card elevation={0} className={classes.card}>
      <CardContent>
        {/*TOP PART (ABOVE GRAPH) */}
        <div className={classes.dateSelectorDiv}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/*START DATE CALENDAR */}
            <DesktopDatePicker
              label="Start Date"
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              InputProps={{ className: classes.datepickerTextboxPalette }}
              renderDay={(day, selected, DayProps) => {
                //https://stackoverflow.com/questions/61502954/highlighting-weekend-days-sat-and-sun-in-material-ui-date-picker

                //highlight the start and end specially
                if (
                  datesAreOnSameDay(day, start) ||
                  datesAreOnSameDay(day, end)
                ) {
                  return (
                    <PickersDay
                      {...DayProps}
                      classes={{ root: classes.selectedDay }}
                    />
                  );
                }

                //Highlight selected dates in range of start to end
                if (inDateRange(day, start, end)) {
                  return (
                    <PickersDay
                      {...DayProps}
                      classes={{ root: classes.highlightedDay }}
                    />
                  );
                }

                //Disable days that come after the end date (so that start !> end)
                if (day > end) {
                  return <PickersDay {...DayProps} disabled={true} />;
                }
                return <PickersDay {...DayProps} />;
              }}
            />

            {/*END DATE CALENDAR */}
            <DesktopDatePicker
              label="End Date"
              color="secondary"
              disableCloseOnSelect={false}
              value={end}
              onChange={(newValue) => {
                setEnd(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              InputProps={{ className: classes.datepickerTextboxPalette }}
              renderDay={(day, selected, DayProps) => {
                //https://stackoverflow.com/questions/61502954/highlighting-weekend-days-sat-and-sun-in-material-ui-date-picker

                //highlight the start and end specially
                if (
                  datesAreOnSameDay(day, start) ||
                  datesAreOnSameDay(day, end)
                ) {
                  return (
                    <PickersDay
                      {...DayProps}
                      classes={{ root: classes.selectedDay }}
                    />
                  );
                }

                //Highlight selected dates in range of start to end
                if (inDateRange(day, start, end)) {
                  return (
                    <PickersDay
                      {...DayProps}
                      classes={{ root: classes.highlightedDay }}
                    />
                  );
                }

                //Disable days that come before the start date (so that start !> end)
                if (day < start) {
                  return <PickersDay {...DayProps} disabled={true} />;
                }
                return <PickersDay {...DayProps} />;
              }}
            />
          </LocalizationProvider>
        </div>

        {/*CHARTS*/}
        <BarChart
          activeData={ props.activeData }
          className={ classes.graphContainer }
          dates={ { start: start, end: end } }
          dataChoice={ props.dataChoice }
          requireDrawerSelection = {true}
        />
      </CardContent>
    </Card>
  );
}
