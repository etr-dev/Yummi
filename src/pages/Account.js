import React from "react";
import {
  makeStyles,
  Typography,
  Button,
  Card,
  Paper,
  Switch,
  FormControlLabel
} from "@material-ui/core"; //put anything you want to import from material-ui in between the brackets i.e. {makeStyles, Typography, Grid}
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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "100px",
    },
    cardContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "30px",
      width: "100%",
    },
    title: {
      color: theme.palette.text.secondary,
    },
    logoutButton: {
      margin: "30px",
    },
    textContainer: {
      width: "80%",
      backgroundColor: theme.palette.text.secondary,
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
    },
    userText: {
      margin: "20px",
    },
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
      <div className={classes.cardContainer}>
        <Paper className={classes.card} elevation={8}>
          <div className={classes.cardContent}>
            <Typography color="Primary" variant="h3" className={classes.title}>
              Name:{" "}
            </Typography>
            <Paper className={classes.textContainer}>
              <Typography
                color="TextPrimary"
                variant="h5"
                className={classes.userText}
              >
                {user.name}
              </Typography>
            </Paper>
          </div>
          <div className={classes.cardContent}>
            <Typography color="Primary" variant="h3" className={classes.title}>
              Email:{" "}
            </Typography>
            <Paper className={classes.textContainer}>
              <Typography
                color="TextPrimary"
                variant="h5"
                className={classes.userText}
              >
                {user.email}
              </Typography>
            </Paper>
          </div>
          <div className={classes.cardContent}>
            <Typography color="Primary" variant="h3" className={classes.title}>
              Restaurant:{" "}
            </Typography>
            <Paper className={classes.textContainer}>
              <Typography
                color="TextPrimary"
                variant="h5"
                className={classes.userText}
              >
                McDonalds
              </Typography>
            </Paper>
          </div>
          <div className={classes.cardContent}>
            <div className={classes.form}>
            <FormControlLabel
                control={ <Switch
                  color="TextSecondary"
                  size="medium"
                  onChange={ (event) => {
                    if (event.target.checked) {
                      console.log("LightMode");
                    } else {
                      console.log("DarkMode");
                    }
                  } }
                /> }
                label={
                  <Typography
                  color="TextPrimary"
                  variant="h6"
                  className={classes.userText}
                >
                  Light/Dark Mode
                </Typography>
                }
                labelPlacement='top'
              />
              <Button className={classes.logoutButton} onClick={() => logout()}>
                <Typography color="TextPrimary" variant="h4">
                  Logout
                </Typography>
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
