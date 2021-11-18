import React from "react";
import { makeStyles, Typography, Button, Grid, Card, Paper } from "@material-ui/core"; //put anything you want to import from material-ui in between the brackets i.e. {makeStyles, Typography, Grid}
import Popup from "../components/popup";
import LoginCard from "../components/loginCard";
import MyDrawer from "../components/drawer";
import axios from "axios";
import { findFileByFilename, findUser, setActive } from "../data/database";
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
    dataColumn: {
      display: "flex",
      flexDirection: "column",
    },
    dataRow: {
      display: "flex",
    },
    dataText: {
      margin: "10px",
    },
    cardClass: {
      margin: "10px",
      whiteSpace: "nowrap",
      borderRadius: "10px"
    },
    rawDataContainer: {
      height: "100vh",
      overflowY: "auto",
    },
    columns: {
      display: "flex",
      justifyContent: "space-around"
    },
    headers:{
      margin: "10px"
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

  //get list of files and set database user
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

  //when drawer selection changes change the active file
  React.useEffect(() => {
    if (dbUser != undefined) {
      const index = findFileByFilename(dbUser, drawerSelection);
      setActiveFile(dbUser.files[ index ]);
    }

    axios(setActive(user.email, drawerSelection))
      .then((res) => {
        console.log('Set Active: ' + drawerSelection)
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
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
        {/* LIST DRAWER     - the drawer on the left that lists all of the file names*/}
        <Grid container>
          <Grid className={classes.drawer} item xs={12} md={3} lg={2}>
            <MyDrawer
              itemList={filelist}
              dataCategories={["files"]}
              rightClickMenu={true}
              menuOptions={["Copy", "Log Data", "Delete"]}
            />
          </Grid>
          {/* RAW DATA      - displays a preview of the rawdata for the selected file */}
          <Grid
            className={classes.rawDataContainer}
            item
            xs={12}
            md={9}
            lg={10}
          >
            {
              activeFile != undefined ? (
                <div className={classes.columns}>
                  {Object.keys(activeFile.rawData[0]).map((column) => (
                    <div>
                      {column == "" ? (
                        <Typography
                        color="textSecondary"
                        variant="h3"
                        className = {classes.headers}
                        >id</Typography>
                      ) : (
                        <Typography
                        color="textSecondary"
                        variant="h3"
                        className = {classes.headers}
                        >{column}</Typography>
                      )}
                      {activeFile.rawData.map((row) => (
                        /* TODO: Render row data to the screen in between in loop */
                        <div className={classes.dataRow}>
                          <Paper elevation={12} className={classes.cardClass}>
                            <Typography
                              color="Primary"
                              variant="h6"

                              className={classes.dataText}
                            >
                              {row[column]}
                            </Typography>
                          </Paper>
                        </div>
                        /*END RENDER METHOD */
                      ))}
                    </div>
                  ))}
                </div>
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
