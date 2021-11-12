import React from "react";
import { makeStyles, Typography, Button, Grid, Card } from "@material-ui/core"; //put anything you want to import from material-ui in between the brackets i.e. {makeStyles, Typography, Grid}
import Popup from "../components/popup";
import LoginCard from "../components/loginCard";
import MyDrawer from "../components/drawer";
import axios from "axios";
import { findFileByFilename, findUser } from "../data/database";
import { useAuth0 } from "@auth0/auth0-react";
import { drawerSelection } from "../data/Redux/Actions/index";
import { useSelector } from "react-redux";

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
    title: {
      height: "10vh",
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      flexWrap: "nowrap",
      paddingTop: "10vh",
      alignItems: "center",
    },
    dataRow: {
      display: "flex",
    },
    dataText: {
      margin: '20px'
    }
  };
});

//this function is what creates the page that will be loaded by App.js
export default function Manage() {
  //variables needed in the return statement are created here
  const [filelist, setfilelist] = React.useState([]);
  const [dbUser, setDbUser] = React.useState();
  const [activeFile, setActiveFile] = React.useState(undefined);
  const drawerSelection = useSelector((state) => state.drawer);
  let files;
  //let dbUser
  const { user } = useAuth0();
  const classes = useStyles();

  React.useEffect(() => {
    axios(findUser(user.email))
      .then((res) => {
        setDbUser(res.data[0]); //get the user object from the Database
        files = res.data[0].files;
        for (let i = 0; i < files.length; i++) {
          setfilelist((filelist) => [...filelist, files[i].fileInfo.filename]);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  React.useEffect(() => {
    if (dbUser != undefined) {
      const index = findFileByFilename(dbUser, drawerSelection);
      setActiveFile(dbUser.files[index]);
    }
  }, [drawerSelection]);

  //The return statement returns JSX code (it is just HTML in javascript basically)
  //This is what will be returned when we call the function in App.js
  return (
    <div className={classes.background}>
      <div className={classes.title}>
        <Typography variant="h2" color="textPrimary">
          {" "}
          Manage{" "}
        </Typography>
      </div>
      {/*BOTTOM PAGE */}
      <div className={classes.background}>
        {/* LIST DRAWER */}
        <Grid container>
          <Grid className={classes.drawer} item xs={12} md={3} lg={2}>
            <MyDrawer itemList={filelist} />
          </Grid>
          {/* CHART */}
          <Grid className={classes.grid} item xs={12} md={9} lg={10}>
            {
              activeFile != undefined ? (
                activeFile.rawData.map(
                  (
                    row //this is what a row looks like https://prnt.sc/1z7h606
                  ) => (
                    /* TODO: Render row data to the screen in between in loop */
                    <div className={classes.dataRow}>
                      <Typography variant="h6" className={classes.dataText}>
                        {row[""]}
                      </Typography>
                      <Typography variant="h6" className={classes.dataText}>
                        {row.ItemName}
                      </Typography>
                    </div>
                    /*END RENDER METHOD */
                  )
                )
              ) : (
                <></>
              ) //dont print anything if active file is undefined (item not clicked yet)
            }
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
