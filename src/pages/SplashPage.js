import * as React from "react";
import { Card, CardContent } from "@material-ui/core/";
import {
  makeStyles,
  Typography,
  Button,
  Grid,
  Box,
  Slide,
} from "@material-ui/core";
import { display, flexbox } from "@mui/system";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import svgBlobs from "../images/backgrounds/blob.svg";
import svgGraph from "../images/undraw/graph.svg";
import GraphCard from "../components/graph.js";
import { TablePagination } from "@mui/material";
import Popup from "../components/popup";
import LoginCard from "../components/loginCard";
import { useAuth0, isAuthenticated, isLoading } from "@auth0/auth0-react";

const pageHeight = "calc(100vh - 70px)";
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
    root: {
      height: "100vh",
      backgroundColor: theme.palette.primary.main, //This is how you access the primary color for our theme (background color)
      backgroundImage: `url(${svgBlobs})`, //This is what makes the blob background on the homepage
      aspectRatio: "960/540",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      overflow: "hidden",
    },
    sides: {
      height: pageHeight,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    logo: {
      maxHeight: "200px",
    },
    specialText: {
      color: theme.palette.text.secondary,
      background: "none",
    },
    button: {
      backgroundColor: theme.palette.primary.main,

      "&:hover": {
        backgroundColor: theme.palette.info.main,
      },
    },
    card: {
      width: "80%",
    },
  };
});

//this function is what creates the page that will be loaded by App.js
export default function SplashPage() {
  const classes = useStyles();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  return (
    <Grid container className={classes.root}>
      {/* This grid splits the page into a left and right half. When the screen is small the right half is hidden to make the screen look okay on mobile. */}
      {/* LEFT */}
      <Grid item xs={12} s={12} md={6} lg={6} className={classes.sides}>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="Yummi.svg"
              alt="logo"
              href="/splashpage"
              className={classes.logo}
            />
            <Typography variant="h1" color="textPrimary">
              Yummi
            </Typography>
          </div>
          <Typography variant="h3" color="textPrimary">
            Data can be confusing...
          </Typography>
          <Typography variant="h3" color="textPrimary">
            We're here to help, start using{" "}
            <mark className={classes.specialText}>Yummi</mark>
            <br />
            today for free!
          </Typography>
        </div>

        {/*BUTTONS: display different button if logged in/out */}
        <div className={{ minHeight: "100%" }}>
          <Slide direction="up" in={isAuthenticated} unmountOnExit mountOnEnter>
            <Button variant="contained" color="primary" className={classes.button}>
              <Typography variant="h2" onClick={(event) => (window.location.href = "/dashboard")}>My Dashboard</Typography>
            </Button>
          </Slide>
          <Slide
            direction="up"
            in={!isLoading && !isAuthenticated}
            unmountOnExit
            mountOnEnter
          >
            <Button
              variant="contained"
              color="primary"
              onClick={ () => loginWithRedirect() }
              className={classes.button}
            >
              <Typography variant="h2">Sign-Up</Typography>
            </Button>
          </Slide>
        </div>
      </Grid>

      {/* RIGHT */}
      <Grid item xs={12} s={12} md={6} lg={6} className={classes.sides}>
        <img src={svgGraph} alt="graph" />
      </Grid>
      
    </Grid>
  );
}
