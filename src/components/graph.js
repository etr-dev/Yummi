import * as React from 'react';
import { Card , CardContent } from '@material-ui/core/';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { makeStyles } from '@material-ui/core'

const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.930 },
];

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex'
    },
    card: {
      backgroundColor: 'transparent'
    },
    chart: {
      color: theme.palette.primary.main,
    }
  }
})

export default function GraphCard(){
  const chartData = data
  const classes = useStyles()
  return (
      <Card elevation = { 0 }
        className = { classes.card }
      >
        <CardContent>
        <Chart
          data={ chartData }
          className={ classes.chart }
          height={ window.innerHeight/2 }
        >
            <ArgumentAxis showGrid={ false } showTicks={ false } />
            <ValueAxis max={ 7 }  showGrid={ false } />

          <BarSeries
            valueField="population"
            argumentField="year"
          />
          <Title text="World population" />
          <Animation />
        </Chart>
        </CardContent>
      </Card>
    );
  }
