import * as React from 'react';
import { Box, makeStyles, Typography, Card , CardContent, Grid, Button } from '@material-ui/core/';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';

const useStyles = makeStyles((theme) => {
    return {
    root: {
        display: 'flex'
    },
        card: {
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '50px',
            paddingBottom: '50px',
            boxShadow: '0'
        },
        content: {
            width: '200%'
        },
        yummi: {
            display: 'flex',
            alignItems: 'center',
            padding: 50
        },
        signin: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'

        },
        title: {
           marginTop:  -30
        },
        logo: {
            height: '150px'
        },
        buttonDiv: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        button: {
            width: '75%',
            marginTop: '20px',
            //fontSize: 25
        }
    }
  })
  

export default function LoginCard() {
    const classes = useStyles()
    return (
        <Box borderRadius='5%' className={ classes.card }>
            <div className={classes.yummi}>
                <img src='Yummi.svg' alt="logo" className={ classes.logo } />
                <div className={classes.signin}>
                    <Typography variant='h4' color='textSecondary' >Sign-in to</Typography> 
                    <Typography variant='h1' color='textPrimary' className={classes.title}>Yummi</Typography>
                </div>
            </div>

            <Typography variant='h6' color='textPrimary' className={ classes.none }>
                Login through one of the methods below...
            </Typography>

            <div className = { classes.buttonDiv }>
                <Button className={ classes.button } size={ 'large' } color='secondary' variant='contained' startIcon={ <GoogleIcon /> }  >Google</Button>
                <Button className={ classes.button } size={ 'large' } color='secondary' variant='contained' startIcon={ <FacebookIcon /> }  >Facebook</Button>
                <Button className = { classes.button } size={ 'large' } color='secondary' variant='contained' startIcon={ <AppleIcon  /> }  >Apple</Button>
            </div>

        </Box>
      );
    }