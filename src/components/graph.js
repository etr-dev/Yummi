import * as React from "react";
import { Card, CardContent } from "@material-ui/core/";
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
  };
});

export default function GraphCard(props) {
  const chartData = props.data;
  const classes = useStyles();
  return (                                                              //todo: create clickevents for d/m/y buttons
    <Card elevation={0} className={classes.card}>
      <CardContent>
              <div>
              <Button size="large" className={classes.button}>
                <Typography variant="h2" color="textSecondary">
                  Day
                </Typography>
              </Button>
              <Button size="large" className={classes.button}> 
                <Typography variant="h2" color="textSecondary">
                  Month
                </Typography>
              </Button>
              <Button size="large" className={classes.button}>
                <Typography variant="h2" color="textSecondary">
                  Year
                </Typography>
              </Button>
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
