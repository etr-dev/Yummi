import * as React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  makeStyles,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
} from "@material-ui/core/";
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
import { Animation } from "@devexpress/dx-react-chart";
import { useDispatch } from "react-redux";
import BarChart from "./BarChart.js";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

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
    optionContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    switches: {
      display: "flex",
      flexDirection: "column",
      minWidth: 160,
    },
    Select: {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "5px",
    },
    selectText: {
      padding: "5px",
    },
    dropdown: {
      minWidth: 160,
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
  const [chartChoice, setChartChoice] = React.useState("Bar");
  const [dataChoice, setDataChoice] = React.useState("Revenue");
  const [dateFormat, setDateFormat] = React.useState("Date");
  const [pieSelection, setPieSelection] = React.useState("Category");
  
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());

  const handleChange = (event) => {
    setChartChoice(event.target.value);
  };

  const handleChangePie = (event) => {
    setPieSelection(event.target.value);
  };

  //set state variables
  React.useEffect(() => {
    if (props.activeData.dates != undefined) {
      const minMaxDate = getMinMaxDate(Object.keys(props.activeData.dates));
      setStart(minMaxDate.start);
      setEnd(minMaxDate.end);
    }
  }, [props.activeData]);

  console.log(chartChoice)
  return (
    //todo: create clickevents for d/m/y buttons
    <Card elevation={0} className={classes.card}>
      <CardContent>
        {/*TOP PART (ABOVE GRAPH) */}
        <div className={classes.optionContainer}>
          {/*DATE SELECTORS*/}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/*START DATE CALENDAR */}
            <DesktopDatePicker
              className={classes.datePickers}
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
              className={classes.datePickers}
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

          {/*DROP DOWN BOX*/}
          <div className={classes.dropdown}>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel>Chart Type</InputLabel>
              <Select
                value={chartChoice}
                label="Chart Type"
                onChange={handleChange}
                displayEmpty
                className={classes.Select}
              >
                <MenuItem value="Bar">
                  <Typography
                    variant="h6"
                    color="TextSecondary"
                    className={classes.selectText}
                  >
                    Bar Chart
                  </Typography>
                </MenuItem>
                <MenuItem value="Line">
                  <Typography
                    variant="h6"
                    color="TextSecondary"
                    className={classes.selectText}
                  >
                    Line Chart
                  </Typography>
                </MenuItem>
                <MenuItem value="Pie">
                  <Typography
                    variant="h6"
                    color="TextSecondary"
                    className={classes.selectText}
                  >
                    Pie Chart
                  </Typography>
                </MenuItem>
              </Select>
              <FormHelperText>Select display type</FormHelperText>
            </FormControl>
          </div>

          {/*SWITCHES*/}
          {chartChoice == "Pie" ? (
            <div className={classes.dropdown}>
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel>Chart Type</InputLabel>
                <Select
                  value={pieSelection}
                  label="Data Type"
                  onChange={handleChangePie}
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
            </div>
          ) : (
            <div className={classes.switches}>
              <FormControlLabel
                control={
                  <Switch
                    color="TextSecondary"
                    color="info"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setDataChoice("Count");
                      } else {
                        setDataChoice("Revenue");
                      }
                    }}
                  />
                }
                label={<Typography variant="h6">{dataChoice}</Typography>}
                className={classes.switchLabel}
              />
              <FormControlLabel
                control={
                  <Switch
                    color="TextSecondary"
                    color="info"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setDateFormat("Day");
                      } else {
                        setDateFormat("Date");
                      }
                    }}
                  />
                }
                label={<Typography variant="h6">{dateFormat}</Typography>}
                className={classes.switchLabel}
              />
            </div>
          )}
        </div>

        {/*CHARTS*/}
        {chartChoice == "Bar" ? (
          <BarChart
            activeData={props.activeData}
            className={classes.graphContainer}
            dates={{ start: start, end: end }}
            dataChoice={dataChoice}
            requireDrawerSelection={true}
            dateFormat={dateFormat}
          />
        ) : chartChoice == "Line" ? (
          <LineChart
            activeData={props.activeData}
            className={classes.graphContainer}
            dates={{ start: start, end: end }}
            dataChoice={dataChoice}
            requireDrawerSelection={true}
            dateFormat={dateFormat}
          />
        ) : chartChoice == "Pie" ? (
          <PieChart
            activeData={props.activeData}
            className={classes.graphContainer}
            dates={{ start: start, end: end }}
            pieSelection={pieSelection}
            requireDrawerSelection={true}
            dateFormat={dateFormat}
          />
        ) : (
          <div></div>
        )}
      </CardContent>
    </Card>
  );
}
