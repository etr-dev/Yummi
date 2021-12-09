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
import ChartContainer from "../components/ChartContainer.js";
import MyDrawer from "../components/drawer";
import BarChart from "../components/BarChart.js";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { formHelperTextClasses } from "@mui/material";
import svgGraph2 from "../images/undraw/graph2.svg";
import { findUser, findActiveFile } from "../data/database";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import {
  drawerSelection,
  categorySelection,
} from "../data/Redux/Actions/index";
import { getMinMaxDate, inDateRange, getTopSellingItem, getToolTip } from "../data/helpers";
import LineChartWavy from "../components/LineChartWavy.js";

const graphMaxHeight = window.innerHeight / 2 + 20;

const useStyles = makeStyles((theme) => {
  return {
    background: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      alignItems: "flex-end",
    },
    drawer: {
      height: "100vh",
    },
    grid: {
      height: "100vh",
    },
    topPage: {
      backgroundColor: theme.palette.primary.main,
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
      height: "95vh",
      marginTop: "5vh",
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
let dataCategories = ["items"];
let chartData = [];
//let itemList = []

export default function Create() {
  const classes = useStyles();
  const { user } = useAuth0();
  const [activeData, setActiveData] = useState({});
  const [itemList, setItemList] = useState([]);
  const [dates, setDates] = useState([{ start: new Date(), end: new Date() }]);
  const categorySelection = useSelector((state) => state.category);
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

  useEffect(() => {
    if (Object.keys(activeData).length > 0) {
      setDates(getMinMaxDate(Object.keys(activeData.dates)));
    }
  }, [activeData]);

  /*UPDATE CHART DATA:
    This runs everytime the variable dateSelection, drawerSelection, or activeData change
    This fills chart data for all of the user selected dates
    creates a list of objects in the format {date, count } EXAMPLE: https://prnt.sc/1yh0439
  */
  if (
    activeData != null &&
    activeData != undefined &&
    Object.keys(activeData).length > 0
  ) {
    //if the active data has been set then set item names
    itemNames = Object.keys(activeData);
    dataCategories = Object.keys(activeData.categories);
    if (itemList !== activeData.categories[categorySelection]) {
      setItemList(activeData.categories[categorySelection]);
    }
  } else {
    itemNames = [];
    dataCategories = ["items"];
  }

  return (
    <>
      {/*TOP PAGE */}
      <Grid container className={classes.topPage}>
        <Grid item xs={12} s={12} md={6} lg={6} className={classes.left}>
          <Typography variant="h2" color="textPrimary">
            { getToolTip(activeData,0,true) }
          </Typography>

          <div>
            <Typography variant="h5" color="textPrimary">
              Top selling product
            </Typography>
            <Button size="large" className={classes.button}>
              <Typography variant="h4" color="textPrimary">
                { getTopSellingItem(activeData).name }
              </Typography>
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} s={12} md={6} lg={6} className={classes.right}>
          <LineChartWavy
            activeData={activeData}
            dataChoice="DATE_REVENUE"
            dates={dates}
            titleText="Revenue by date"
          />
        </Grid>
        {/*BOTTOM PAGE */}
        <Grid className={classes.drawer} item xs={12} md={2} lg={2}>
          <MyDrawer itemList={itemList} dataCategories={dataCategories} />
        </Grid>
        {/* CHART */}
        <Grid className={classes.grid} item xs={12} md={9} lg={10}>
          <ChartContainer activeData={activeData} dataChoice="ITEM_COUNT" />
        </Grid>
      </Grid>
    </>
  );
}
