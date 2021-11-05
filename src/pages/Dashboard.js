import React, { useState, useEffect } from "react";
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
import svgGraph2 from "../images/undraw/graph2.svg";
import { findUser, findActiveFile } from "../data/database";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { drawerSelection } from "../data/Redux/Actions/index";
import { inDateRange } from "../data/helpers";

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

let itemNames = [];

let chartData = [];

export default function Create() {
  const classes = useStyles();
  const { user } = useAuth0();
  const [activeData, setActiveData] = useState({});
  const drawerSelection = useSelector((state) => state.drawer);
  const dateSelection = useSelector((state) => state.date);
  //to get start date do dateSelection.start
  //to get start date do dateSelection.end
  //to get selectedItem do drawerSelection

  //this is ran on page load, it finds which csv file to display for the user
  useEffect(() => {
    axios(findUser(user.email))
      .then((res) => {
        const dbUser = res.data[0]; //get the user object from the Database
        if (dbUser.activeFile != undefined) {
          //if active file is set then use that file
          setActiveData(dbUser.files[findActiveFile(dbUser)].parsedData);
        } else if (dbUser.files.length > 0) {
          setActiveData(dbUser.files[0].parsedData); //if no activedata set then default to first file
        } else {
          setActiveData({}); //if user has no files do not display data
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);


  /*UPDATE CHART DATA:
    This runs everytime the variable dateSelection, drawerSelection, or activeData change
    This fills chart data for all of the user selected dates
    creates a list of objects in the format {date, count } EXAMPLE: https://prnt.sc/1yh0439
  */
  React.useEffect(() => {
    //RIGHT NOW THE EDGE CASES WOULD BE LEFT OUT start/end
    if (dateSelection && drawerSelection && activeData) {             //if none of the data is empty
      chartData = [];                                                 //clear data
      let keys = Object.keys(activeData[drawerSelection]);            //get all of the dates from the Active data where the selected item was sold
      for (let i = 0; i < keys.length; i++) {                         //loop through all of the dates where items sold
        const day = new Date(keys[i]);                                //parse date string to a Date object
        if (
          inDateRange(day, dateSelection.start, dateSelection.end) && //if the date is in range of the start and end dates the user selected and not null push object to chartData
          !isNaN(day.getTime())
        ) {
          chartData.push({                                            //push object onto chart data
            date: keys[i],
            count: activeData[drawerSelection][keys[i]].Count,
          });
        }
      }
    }
  }, [dateSelection, drawerSelection, activeData]);                    // the variables inside of [] trigger useEffect when one of them changes

  if (activeData != null && activeData != undefined) {
    //if the active data has been set then set item names
    itemNames = Object.keys(activeData);
  } else {
    itemNames = [];
  }

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
            <img src={svgGraph2} alt="graph" />
          </Grid>
        </Grid>
      </div>

      {/*BOTTOM PAGE */}
      <div className={classes.background}>
        {/* LIST DRAWER */}
        <Grid container>
          <Grid className={classes.drawer} item xs={12} md={3} lg={2}>
            <MyDrawer
              itemNames={
                itemNames /*Send our active data menu items to MyDrawer component*/
              }
            />
          </Grid>
          {/* CHART */}
          <Grid className={classes.grid} item xs={12} md={9} lg={10}>
            {console.log(chartData)}
            <GraphCard data={chartData} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
