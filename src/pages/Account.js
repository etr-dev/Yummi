import React from "react";
import { makeStyles, Typography, Button, Card } from "@material-ui/core"; //put anything you want to import from material-ui in between the brackets i.e. {makeStyles, Typography, Grid}
import Popup from "../components/popup";
import LoginCard from "../components/loginCard";
import { useAuth0 } from "@auth0/auth0-react";
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
      height: "100vh",
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '100px',
      
    },
    cardContainer:{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '30px',

    },
    title: {
      color: theme.palette.text.secondary
    }
  };
});

//this function is what creates the page that will be loaded by App.js
export default function Account() {
  //variables needed in the return statement are created here
  const classes = useStyles();
  const { user, logout } = useAuth0();

  //The return statement returns JSX code (it is just HTML in javascript basically)
  //This is what will be returned when we call the function in App.js
  return (
    <div className={classes.background}>
      <div className = {classes.cardContainer}>
      <Card className={classes.card}>
        <div className ={classes.cardContent}>
        <Typography color='Primary'variant = 'h3' className = {classes.title}>
           Name: </Typography>
        <Typography color='TextPrimary' variant = 'h5'>{ user.name }</Typography>
        </div>
        <div className ={classes.cardContent}>
        <Typography color='Primary'variant = 'h3' className = {classes.title}>
           Email: </Typography>
        <Typography color='TextPrimary' variant = 'h5'>{ user.email }</Typography>
        </div>
        <div className ={classes.cardContent}>
        <Typography color='Primary'variant = 'h3' className = {classes.title}>
         Restaurant: </Typography>
        <Typography color='TextPrimary' variant = 'h5'>McDonalds</Typography>
        </div>
        <div className ={classes.cardContent}>
        <Typography color='Primary'variant = 'h3' className = {classes.title}>
        Account Status: </Typography>
        <Typography color='TextPrimary' variant = 'h5'>Verified</Typography>
        </div>
      </Card>
      </div>
    </div>
  );
}