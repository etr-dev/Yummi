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
} from "@material-ui/core/";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { minWidth } from "@mui/system";
import { useDispatch } from "react-redux";
import { drawerAction, categoryAction } from "../data/Redux/Actions";
import { IconButton } from "@mui/material";

const graphMaxHeight = window.innerHeight / 2 + 20;
const headerHeight = 100;

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
  };
});

export default function MyDrawer(props) {
  const classes = useStyles();
  let itemList = props.itemList
  if (itemList == undefined) itemList = []  //if no itemlist is passed in then default to empty
  const dataCategories = props.dataCategories;
  const [index, setIndex] = React.useState(0);
  const [disableRight, setDisableRight] = React.useState(false);
  const [disableLeft, setDisableLeft] = React.useState(false);
  const [drawerSelection, setDrawerSelection] = React.useState(null);
  const [categorySelection, setCategorySelection] = React.useState(
    props.dataCategories[0]
  );
  const dispatch = useDispatch();


  //this sets global state of drawer
  useEffect(() => {
    dispatch(drawerAction(drawerSelection));
  }, [drawerSelection]);

  //this sets global use state of category
  useEffect(() => {
    dispatch(categoryAction(categorySelection));
  }, [categorySelection]);


  //This use effect keeps the index in bounds
  useEffect(() => {
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

  return (
    <div className={classes.bigGrid}>
      {/* HEADER FOR LIST*/}
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
              {props.itemList.map((entry) => (
                <MenuItem
                  button
                  onClick={() => setDrawerSelection(entry)}
                  selected={entry === drawerSelection}
                  divider
                  classes={{ selected: classes.selected }}
                >
                  <ListItem>
                    <Typography variant="h5">{entry}</Typography>
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
