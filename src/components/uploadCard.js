import * as React from "react";
import {
  Box,
  makeStyles,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@material-ui/core/";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { useDropzone } from "react-dropzone";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import svgUpload from "../images/backgrounds/upload_675x900.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllUsers } from "../data/database";
import { parseFileAndUpload } from "../data/parse";
import { uploadFile, findUser, createUser, initializeUser } from "../data/database";
import axios from "axios";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    card: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "10px",
      paddingBottom: "10px",
      boxShadow: "0px 0px 20px -5px",
    },
    titleDiv: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "60px",
    },
    uploadDiv: {
      marginTop: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      cursor: "pointer",
      height: 200,
      width: "80%",
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "10%",
      border: `dashed 3px  ${theme.palette.info.main}`,
      boxShadow: "0px 0px 20px -5px",
    },
    icon: {
      transform: "scale(4)",
      color: theme.palette.text.primary,
    },
    x: {
      marginTop: 20,
      display: "flex",
      flexDirection: "row-reverse",
    },
  };
});

export default function LoginCard(props) {
  const classes = useStyles();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { user } = useAuth0();
  const [ checked, setChecked ] = React.useState(false);
  
  if (!checked) {
    initializeUser(user.email); //creates DB account if not existing
    setChecked(true)
  }
  //this is what is executed when a file is uploaded
  const files = acceptedFiles.map((file) => {
     return file;
  });

  React.useEffect(() => {
    if (files.length > 0) {
      const file = files[files.length - 1]; //gets last added file
      console.log(parseFileAndUpload(file, user.email));
    }
  }, [files.length]);



  return (
    <Box borderRadius="5%" className={classes.card}>
      <div className={classes.titleDiv}>
        <Typography variant="h3" color="textPrimary" className={classes.none}>
          Drag and Drop
        </Typography>
        <Typography variant="h5" color="textPrimary">
          Your data below
        </Typography>
      </div>

      <Typography variant="h6" color="textPrimary" align="center">
        accepted file types: <br /> .csv .xlx
      </Typography>

      {/* UPLOAD AREA */}
      <div
        {...getRootProps({ className: "dropzone" })}
        className={classes.uploadDiv}
      >
        <input {...getInputProps()} />
        <Typography variant="h5" color="textPrimary" align="center">
          Drag file here or click to browse
        </Typography>
        <UploadRoundedIcon className={classes.icon} />
      </div>
      <Button className={classes.x} onClick={props.close}>
        close
      </Button>
    </Box>
  );
}
