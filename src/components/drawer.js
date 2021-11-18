import React, { useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  makeStyles,
  Card,
  Grid,
  Box,
  useMediaQuery,
  MenuItem,
  Menu,
} from "@material-ui/core/";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { minWidth } from "@mui/system";
import { useDispatch } from "react-redux";
import { drawerAction, categoryAction } from "../data/Redux/Actions";
import { IconButton } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { menuFunction } from "../data/helpers";

const graphMaxHeight = window.innerHeight / 2 + 20;
const headerHeight = 100;


/*
*
*       STYLING:
*       This is where the css styles are created.
*
*
*/
const useStyles = makeStyles((theme) => {
  return {
    background: {
      backgroundColor: theme.palette.primary.main,
    },
    card: {
      backgroundColor: theme.palette.primary.main,
      height: "90vh",
      overflow: "auto",
    },
    header: {
      minWidth: "100%",
      paddingTop: "4vh",
      paddingBottom: "4vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "2vh",
    },
    icons: {
      color: theme.palette.secondary.main,
      opacity: 0.6,

      "&:hover": {
        color: theme.palette.info.main,
        opacity: 1,
      },
    },
    bigGrid: {
      minWidth: "100%",
      maxHeight: "100vh",
      minHeight: "100%",
      overflow: "hidden",
    },
    pog: {
      minWidth: "100%",
      height: "100vh",
    },
    selected: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.main,
    },
    rightClickMenu: {
      color: theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.text.primary,
      },
    },
  };
});


/*
*
*       MAIN FUNCTION:
*       The main function executes here and can take in various props
*       
*       PROP LIST:
*        itemList: An array of strings with all the items to be displayed in the drawer, if not passed into props it is set to [] an empty array that displays nothing
*        dataCategories: An array of string categories passed in that you can switch between at the top of the drawer, if nothing is passed in then it will be set to ["ITEMS"]
*        menuOptions: An array of strings to be displayed when rightClicked, once clicked they are called in the menuFunction in helpers.js ... If none are passed in then the menu cannot be opened.
*                     Make sure when passing in menu options the string you pass in has a matching switch statement call in menuFunction
*/
export default function MyDrawer(props) {
  /*
  *       VARIABLES:
  *       This is where all of the variables are created and initialized
  */
  //import variables
  const classes = useStyles();
  const { user } = useAuth0();
  const dispatch = useDispatch();

  //Prop initialization
  let itemList = props.itemList;
  if (itemList == undefined) itemList = []; //if no itemlist is passed in then default to empty
  let dataCategories = props.dataCategories;
  if (dataCategories == undefined) dataCategories = [ "ITEMS" ];
  let menuOptions = props.menuOptions;
  if (menuOptions == undefined) menuOptions = []; //if no itemlist is passed in then default to empty
  
  //Use State variables
  const [index, setIndex] = React.useState(0);
  const [disableRight, setDisableRight] = React.useState(false);
  const [disableLeft, setDisableLeft] = React.useState(false);
  const [drawerSelection, setDrawerSelection] = React.useState(null);
  const [categorySelection, setCategorySelection] = React.useState(dataCategories[0]);
  const [contextMenu, setContextMenu] = React.useState(null);

  //Right Click menu functions
  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };
  const handleClose = (choice, entry) => {
    console.log(choice, entry);
    menuFunction(choice, entry, user.email);
    setContextMenu(null);
  };

  //Use Effect functions
  useEffect(() => { //sets the drawer selection globally
    dispatch(drawerAction(drawerSelection));
  }, [drawerSelection]);

  useEffect(() => {  //this sets global use state of category
    dispatch(categoryAction(categorySelection));
  }, [categorySelection]);

  useEffect(() => { //This use effect keeps the index in bounds
    if (index == dataCategories.length - 1) {
      setDisableRight(true);
    } else {
      setDisableRight(false);
    }
    if (index == 0) {
      setDisableLeft(true);
    } else {
      setDisableLeft(false);
    }
  }, [index, dataCategories]);


  /*
   * 
   *      RETURN FUNCTION:
   *      This is what renders the drawer component
   * 
   */
  return (
    <div className={classes.bigGrid}>
      {/* CATEGORY FOR LIST*/}
      <Grid className={classes.header}>
        <IconButton
          onClick={() => {
            setCategorySelection(dataCategories[index - 1]);
            setIndex(index - 1);
          }}
          disabled={disableLeft}
        >
          <KeyboardArrowLeftIcon className={classes.icons} fontSize={"large"} />
        </IconButton>
        <Typography
          variant="h4"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          {dataCategories[index]}
        </Typography>
        <IconButton
          onClick={() => {
            setCategorySelection(dataCategories[index + 1]);
            setIndex(index + 1);
          }}
          disabled={disableRight}
        >
          <KeyboardArrowRightIcon
            className={classes.icons}
            fontSize={"large"}
          />
        </IconButton>
      </Grid>

      {/* LIST DRAWER */}
      <div className={classes.pog}>
        <Grid className={classes.drawer}>
          <Card elevation={8} className={classes.card}>
            <List>
              {props.itemList.map((entry) => (  //FOR LOOP THAT LISTS ALL OF THE ITEMS entry IS THE NAME OF THE ITEM FROM ITEMLIST
                <MenuItem //make the list item a menuitem so it can be clicked and selected
                  button
                  onClick={() => setDrawerSelection(entry)}
                  selected={entry === drawerSelection}
                  divider
                  classes={{ selected: classes.selected }}
                >
                  <ListItem
                    onContextMenu={handleContextMenu}
                    style={{ cursor: "context-menu" }}
                  >
                    <Typography variant="h5">{entry}</Typography>
                    <Menu
                      open={contextMenu !== null && menuOptions.length > 0} //if menu is not currently up AND the menu was enabled by the rightClickMenu prop being true
                      onClose={handleClose}
                      anchorReference="anchorPosition"
                      anchorPosition={
                        contextMenu !== null
                          ? {
                              top: contextMenu.mouseY,
                              left: contextMenu.mouseX,
                            }
                          : undefined
                      }
                    >
                      { menuOptions.map((option) => (   //LOOP THROUGH ALL OF THE RIGHT CLICK MENU OPTIONS PASSED INTO PROPS
                        <MenuItem
                          className={ classes.rightClickMenu }
                          onClick={ () => handleClose(option, entry) }
                        >
                          { option }
                        </MenuItem>
                      )) }
                    </Menu>
                  </ListItem>
                </MenuItem>
              ))}
            </List>
          </Card>
        </Grid>
      </div>
    </div>
  );
}
