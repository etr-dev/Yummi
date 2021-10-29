import React from "react";
import {
  Link,
  Button,
  IconButton,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Slide,
  Fade
} from "@material-ui/core";
import TimelineIcon from "@mui/icons-material/Timeline";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import YummiLogo from "../images/Yummi.svg";
import Popup from "../components/popup";
import UploadCard from "../components/uploadCard";
import { useAuth0 } from "@auth0/auth0-react";

const spacing = "30px";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
    },
    root: {
      display: "flex",
    },
    logoContainer: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
    },
    active: {
      background: "#f4f4f4",
    },
    appBar: {},
    title: {
      fontWeight: 700,
      cursor: "pointer",
    },
    logo: {
      maxWidth: 50,
      padding: 10,
      paddingLeft: 80,
      cursor: "pointer",
    },
    navText: {
      marginRight: spacing,
      marginLeft: spacing,
    },
    userName: {
      fontWeight: 550,
    },
    toolbarHeight: {},
    icon: {
      transform: "scale(2)",
      color: theme.palette.text.primary,
    },
    clickable: {
      cursor: "pointer",
    },
    login: {
      cursor: "pointer",
      marginRight: 60,
    },
    account: {
      display: "flex",
      alignItems: "center",
      marginRight: spacing,
      marginLeft: spacing,
    },
    profilePicture: {
      minWidth: "60px",
      minHeight: "60px",
      marginRight: "10px",
      borderRadius: "20%",
    },
  };
});

export default function Layout({ children }) {
  const { user, isAuthenticated, logout, loginWithRedirect, isLoading } = useAuth0();
  const classes = useStyles();
  console.log(user);

  {
    /*While the auth loads dont display nav items except logo*/
  }
  if (isLoading) {
    return (
      <div className={classes.root}>
        {/* app bar */}
        <AppBar
          position="absolute"
          className={classes.appBar}
          elevation={0}
          color="transparent"
        >
          <Toolbar className={classes.toolbarHeight}>
            {/*CONTAINS LOGO & TEXT*/}
            <div className={classes.logoContainer}>
              <img
                src="Yummi.svg"
                alt="logo"
                onClick={(event) => (window.location.href = "/")}
                className={classes.logo}
              />
              <Typography
                onClick={(event) => (window.location.href = "/")}
                className={classes.title}
                variant="h4"
                color="textPrimary"
              >
                Yummi
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        {/* main content */}
        <div className={classes.page}>
          <div className={classes.toolbar}></div>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position="absolute"
        className={classes.appBar}
        elevation={0}
        color="transparent"
      >
        <Toolbar className={classes.toolbarHeight}>
          {/*CONTAINS LOGO & TEXT*/}
          <div className={classes.logoContainer}>
            <img
              src="Yummi.svg"
              alt="logo"
              onClick={(event) => (window.location.href = "/")}
              className={classes.logo}
            />
            <Typography
              onClick={(event) => (window.location.href = "/")}
              className={classes.title}
              variant="h4"
              color="textPrimary"
            >
              Yummi
            </Typography>
          </div>
          {/*if logged in show account else show login option*/}
          {isAuthenticated ? (
            <>
          
              {/* ACCOUNT INFO CONTAINER */ }
              <Slide
                direction="down"
                in={!isLoading}
                mountOnEnter
                unmountOnExit
              >
                <div
                  onClick={() => logout()}
                  //onClick={(event) => (window.location.href = "/account")}
                  className={classes.account}
                >
                  <Avatar
                    alt={user.name}
                    src={user.picture}
                    variant="rounded"
                    className={classes.profilePicture}
                  />
                  <div className={classes.accountText}>
                    <Typography
                      variant="h4"
                      color="textPrimary"
                      className={classes.userName}
                    >
                      Hello {user.given_name}!
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textPrimary"
                      align="left"
                    >
                      McDonalds
                    </Typography>
                  </div>
                </div>
              </Slide>
              
              <Fade 
                in={ !isLoading }
                timeout={{ enter: 1000 }}
              >
                <div>
              {/* DASHBOARD BUTTON */ }
              
                <IconButton
                  onClick={(event) => (window.location.href = "/dashboard")}
                  className={classes.navText}
                >
                  <TimelineIcon className={classes.icon} />
                </IconButton>
                
              {/* UPLOAD BUTTON */ }
                <Popup
                  button={{
                    color: "primary",
                    icon: <UploadRoundedIcon className={classes.icon} />,
                  }}
                  popupCard={<UploadCard />}
              />
                {/* MANAGE BUTTON */}
                <IconButton
                  onClick={(event) => (window.location.href = "/manage")}
                  className={classes.navText}
                >
                  <SettingsIcon className={classes.icon} />
                </IconButton>
                </div>
              </Fade >
            </>
          ) : (
            <Typography
              variant="h4"
              color="textPrimary"
              className={classes.login}
              onClick={() => loginWithRedirect()}
            >
              Login
            </Typography>
          )}
          {/* END OF if-else */}
        </Toolbar>
      </AppBar>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
