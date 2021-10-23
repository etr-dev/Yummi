import React from 'react';
import { makeStyles, Typography} from '@material-ui/core' //put anything you want to import from material-ui in between the brackets i.e. {makeStyles, Typography, Grid}

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
        }
      
    }
})
  
//this function is what creates the page that will be loaded by App.js
export default function SplashPage() {
    //variables needed in the return statement are created here
    const classes = useStyles()

    //The return statement returns JSX code (it is just HTML in javascript basically)
    //This is what will be returned when we call the function in App.js
    return (
      <div className={classes.background}>
        <Typography variant="h6" color="textSecondary" component="h2" gutterBottom>SplashPage</Typography>
      </div>
    )
  }