import React from "react";
import { makeStyles, Typography, Button, Grid } from "@material-ui/core"; //put anything you want to import from material-ui in between the brackets i.e. {makeStyles, Typography, Grid}
import Popup from "../components/popup";
import LoginCard from "../components/loginCard";
import MyDrawer from "../components/drawer";

/*

    Our Palette colors are stored in the material-ui theme object
    #132232 ->  theme.palette.primary.main
    #203647 ->  theme.palette.secondary.main
    #007CC7 ->  theme.palette.info.main

    #EEFBFB ->  theme.palette.text.primary
    #4DA8DA ->  theme.palette.text.secondary

    Material-ui default theme object: https://mui.com/customization/default-theme/#main-content
*/

//This function is where you create your CSS styles for the page
const useStyles = makeStyles((theme) => {
  return {
    background: {
      backgroundColor: theme.palette.primary.main,
    },
    title:{
      height:"10vh", 
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      flexWrap: "nowrap",
      paddingTop: "10vh",
      alignItems: "center",
    }
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

//this function is what creates the page that will be loaded by App.js
export default function Manage() {
  //variables needed in the return statement are created here
  const classes = useStyles();

  //The return statement returns JSX code (it is just HTML in javascript basically)
  //This is what will be returned when we call the function in App.js
  return (
    <div className={classes.background}>
      <div className={classes.title}> 
      <Typography variant= "h2" color="textPrimary"> Manage </Typography>
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
