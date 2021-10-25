import * as React from "react";
import { Card, CardContent } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
  };
});

export default function Template() {
  const classes = useStyles();
  return <></>;
}
