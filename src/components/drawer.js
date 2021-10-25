import React from "react";
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
} from "@material-ui/core/";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { minWidth } from "@mui/system";

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
  };
});

export default function MyDrawer(props) {
  const classes = useStyles();
  const itemNames = props.itemNames;
  const dataCategories = props.dataCategories; //this is currently not passed
  return (
    <div className={classes.bigGrid}>
      {/* HEADER FOR LIST*/}
      <Grid className={classes.header}>
        <KeyboardArrowLeftIcon className={classes.icons} fontSize={"large"} />
        <Typography
          variant="h4"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Menu Items
        </Typography>
        <KeyboardArrowRightIcon className={classes.icons} fontSize={"large"} />
      </Grid>

      {/* LIST DRAWER */}
      <div className={classes.pog}>
        <Grid className={classes.drawer}>
          <Card elevation={8} className={classes.card}>
            <List>
              {itemNames.map((entry) => (
                <ListItem button={true} divider={true}>
                  <Typography variant="h5">{entry}</Typography>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </div>
    </div>
  );
}
