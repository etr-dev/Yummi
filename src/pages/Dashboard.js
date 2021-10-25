import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Card,
  List,
  ListItem,
  Box,
  Button,
} from "@material-ui/core";
import GraphCard from "../components/graph.js";
import MyDrawer from "../components/drawer";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { formHelperTextClasses } from "@mui/material";
const graphMaxHeight = window.innerHeight / 2 + 20;

const useStyles = makeStyles((theme) => {
  return {
    background: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      alignItems: "flex-end",
    },
    drawer: {
      maxHeight: "100vh",
    },
    grid: {
      maxHeight: "100vh",
    },
    topPage: {
      backgroundColor: theme.palette.primary.main,
      height: "100vh",
    },
    left: {
      paddingLeft: "15vh",
      paddingRight: "5vh",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "space-evenly",
    },
    right: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    button: {
      backgroundColor: theme.palette.secondary.main,
      padding: "20px",
      paddingRight: "40px",
      paddingLeft: "40px",
    },
    red: {
      backgroundColor: "red",
      width: "100%",
    },
  };
});

const itemNames = [
  "Big Mac",
  "Quarter Pounder with Cheese",
  "Double Quarter Pounder with Cheese",
  "Filet-O-Fish",
  "2 Cheeseburgers",
  "Southern Style Chicken",
  "Bacon Clubhouse Burger",
  "Chicken McNuggets - 20pc",
  "Small French Fry",
  "Medium French Fry",
  "McDouble",
  "Buffalo Ranch McChicken",
  "Quarter Pounder with Cheese",
  "Double Quarter Pounder with Cheese",
  "Filet-O-Fish",
  "2 Cheeseburgers",
  "Southern Style Chicken",
  "Bacon Clubhouse Burger",
  "Chicken McNuggets - 20pc",
  "Small French Fry",
  "Medium French Fry",
  "McDouble",
  "Buffalo Ranch McChicken",
  "Small French Fry",
  "Medium French Fry",
  "McDouble",
  "Buffalo Ranch McChicken",
  "Quarter Pounder with Cheese",
  "Double Quarter Pounder with Cheese",
  "Filet-O-Fish",
  "2 Cheeseburgers",
  "Southern Style Chicken",
  "Bacon Clubhouse Burger",
  "Chicken McNuggets - 20pc",
  "Small French Fry",
  "Medium French Fry",
  "McDouble",
  "END",
];

const data = [
  { year: "1950", population: 2.525 },
  { year: "1960", population: 3.018 },
  { year: "1970", population: 3.682 },
  { year: "1980", population: 4.44 },
  { year: "1990", population: 5.31 },
  { year: "2000", population: 6.127 },
  { year: "2010", population: 6.93 },
];

export default function Create() {
  const classes = useStyles();
  return (
    <>
      {/*TOP PAGE */}
      <div className={classes.topPage}>
        <Grid container>
          <Grid item xs={12} s={6} md={6} lg={6} className={classes.left}>
            <Typography variant="h2" color="textPrimary">
              Your overall sales at McDonalds are up 20% since last month!
            </Typography>

            <div>
              <Typography variant="h5" color="textPrimary">
                Top selling product
              </Typography>
              <Button size="large" className={classes.button}>
                <Typography variant="h4" color="textPrimary">
                  Product Name Here
                </Typography>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} s={6} md={6} lg={6} className={classes.right}>
            <Typography variant="h5">a graph will go here</Typography>
          </Grid>
        </Grid>
      </div>

      {/*BOTTOM PAGE */}
      <div className={classes.background}>
        {/* LIST DRAWER */}
        <Grid container>
          <Grid className={classes.drawer} item xs={12} md={3} lg={2}>
            <MyDrawer itemNames={itemNames} />
          </Grid>
          {/* CHART */}
          <Grid className={classes.grid} item xs={12} md={9} lg={10}>
            <GraphCard data={data} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
