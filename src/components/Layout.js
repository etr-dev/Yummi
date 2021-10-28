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
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const classes = useStyles();
  console.log(user);

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
          {isAuthenticated ? (
            <>
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

              <IconButton
                onClick={(event) => (window.location.href = "/dashboard")}
                className={classes.navText}
              >
                <TimelineIcon className={classes.icon} />
              </IconButton>

              <Popup
                button={{
                  color: "primary",
                  icon: <UploadRoundedIcon className={classes.icon} />,
                }}
                popupCard={<UploadCard />}
              />

              <IconButton
                onClick={(event) => (window.location.href = "/manage")}
                className={classes.navText}
              >
                <SettingsIcon className={classes.icon} />
              </IconButton>
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

// import React from 'react'
// import { makeStyles } from '@material-ui/core'
// import { Typography, AppBar, Toolbar } from '@material-ui/core'

// const useStyles = makeStyles((theme)=>{
//     return {
//         page: {
//             background: '#112232', //'rgba(17, 34, 50, .1)'
//             width: '100%'
//         },

//         appbar: {
//         },
//         title:{
//             flexGrow: 1
//         },
//         logo:{
//             maxWidth: 50,
//             padding: 10,
//             paddingLeft: 80
//         },
//         navText:{
//             paddingRight: 60,
//             paddingLeft: 60,
//             fontWeight: 400
//         },
//         userName:{
//             paddingRight: 60,
//             paddingLeft: 60,
//             fontWeight: 550
//         },
//         toolbar: theme.mixins.toolbar,
//     }
// })

// export default function Layout({ children }) {
//     const classes = useStyles()
//     return (
//         <div>
//             {/* NAV BAR */}
//             <AppBar position='fixed' color='transparent' elevation={1}>
//                 <Toolbar>
//                     <img src='YummiLogo.png' alt="logo" className={classes.logo}/>
//                     <Typography className={classes.title} variant='h2' color='textPrimary'>
//                         Yummi
//                     </Typography>
//                     <div>
//                         <Typography variant='h4' color='textPrimary' className={classes.userName}>
//                             Hello Elijah!
//                         </Typography>
//                         <Typography variant='subtitle1' color='textPrimary' className={classes.navText} align='center'>
//                             McDonalds
//                         </Typography>
//                     </div>
//                     <Typography variant='h4' color='textPrimary' className={classes.navText}>
//                         Upload
//                     </Typography>
//                     <Typography variant='h4' color='textPrimary' className={classes.navText}>
//                         Manage
//                     </Typography>
//                     <Typography variant='h4' color='textPrimary' className={classes.navText}>
//                         Dashboard
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             pog
//             <div className = {classes.page}>
//             <div className={classes.toolbar}></div>
//                 { children }
//             </div>
//         </div>
//     )
// }
