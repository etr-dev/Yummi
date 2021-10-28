import * as React from "react";
import { Card, CardContent, CircularProgress } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: theme.palette.primary.main,
    },
  };
});

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size='10vh' color='secondary' />
    </div>
  );
}
