import React from "react";
import {
  Link,
  Button,
  IconButton,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import TimelineIcon from "@mui/icons-material/Timeline";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import YummiLogo from "../images/Yummi.svg";
import Popup from "../components/popup";
import UploadCard from "../components/uploadCard";
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
      cursor: "pointer",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {},
    appBar: {},
    title: {
      fontWeight: 700,
    },
    logo: {
      maxWidth: 50,
      padding: 10,
      paddingLeft: 80,
    },
    navText: {
      marginRight: 60,
      marginLeft: 60,
    },
    userName: {
      paddingRight: 60,
      paddingLeft: 60,
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
  };
});

export default function Layout({ children }) {
  const classes = useStyles();

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
          <div
            onClick={(event) => (window.location.href = "/account")}
            className={classes.clickable}
          >
            <Typography
              variant="h4"
              color="textPrimary"
              className={classes.userName}
            >
              Hello Elijah!
            </Typography>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              className={classes.navText}
              align="center"
            >
              McDonalds
            </Typography>
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
