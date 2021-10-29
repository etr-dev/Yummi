import * as React from "react";
import { Card, CardContent } from "@material-ui/core/";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
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
  return (
    <Card elevation={0} className={classes.card}>
      <CardContent>
        <Chart
          data={chartData}
          className={classes.chart}
          height={window.innerHeight * 0.9}
        >
          <ArgumentAxis showGrid={false} showTicks={false} />
          <ValueAxis max={7} showGrid={false} />

          <BarSeries valueField="population" argumentField="year" />
          <Title text="Yummi Demo Graph" />
          <Animation />
        </Chart>
      </CardContent>
    </Card>
  );
}
