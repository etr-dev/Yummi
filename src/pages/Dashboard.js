import React, { useState } from 'react'
import {
  makeStyles,
  Grid,
  Typography,
  Card,
  List, ListItem, Box
} from '@material-ui/core'
import GraphCard from '../components/graph.js'
import MyDrawer from '../components/drawer'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { formHelperTextClasses } from '@mui/material';

const graphMaxHeight=window.innerHeight/2 + 20

const useStyles = makeStyles((theme) => {
  return {
    background: {
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'flex-end'

    },
    drawer: {
      maxHeight: graphMaxHeight,
    },
    grid: {
      maxHeight: graphMaxHeight,
    },
  }
})

const itemNames = [
  'Big Mac', 'Quarter Pounder with Cheese', 'Double Quarter Pounder with Cheese', 'Filet-O-Fish',
  '2 Cheeseburgers', 'Southern Style Chicken', 'Bacon Clubhouse Burger', 'Chicken McNuggets - 20pc',
  'Small French Fry', 'Medium French Fry', 'McDouble', 'Buffalo Ranch McChicken', 'Quarter Pounder with Cheese', 'Double Quarter Pounder with Cheese', 'Filet-O-Fish',
  '2 Cheeseburgers', 'Southern Style Chicken', 'Bacon Clubhouse Burger', 'Chicken McNuggets - 20pc',
  'Small French Fry', 'Medium French Fry', 'McDouble', 'Buffalo Ranch McChicken'
]

export default function Create() {
  const classes = useStyles()
  return (
    <div className={ classes.background }>
      
      {/* LIST DRAWER */}
      <Grid container>
      <Grid className={classes.drawer}item xs={12} md={3} lg={2}>
          <MyDrawer />
       </Grid>
        {/* CHART */}
        <Grid className={ classes.grid }item xs={12} md={9} lg={10}>
          <GraphCard/>
        </Grid>
      </Grid>
    </div>
  )
}