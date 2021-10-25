import * as React from 'react';
import { Card , CardContent } from '@material-ui/core/';
import { makeStyles, Typography, Button, Grid, Box } from '@material-ui/core'
import { display, flexbox } from '@mui/system';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import svgBlobs from '../images/backgrounds/blob.svg'
import svgGraph  from '../images/undraw/graph.svg'
import GraphCard from '../components/graph.js'
import { TablePagination } from '@mui/material';

const pageHeight = 'calc(100vh - 70px)'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            height: '100vh',
            backgroundColor: theme.palette.primary.main,
            backgroundImage: `url(${svgBlobs})`,
            aspectRatio: '960/540',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            overflow: 'hidden'
            
            
        },
        sides: {
            height: pageHeight,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        logo: {
            maxHeight: '200px'
        },
        specialText: {
            color: theme.palette.text.secondary,
            background: 'none'
        },
        button: {
            backgroundColor: theme.palette.primary.main,
      
            '&:hover': {
                backgroundColor: theme.palette.info.main,
            }
        },
        card: {
            width: '80%'
        }
    }
  })
  
  export default function Page(){
    const classes = useStyles()
    return (
        <Grid container className={ classes.root }>
            {/* LEFT */ }
            <Grid
                item xs={ 12 } s={ 12 } md={ 6 } lg={ 6 }
                className={ classes.sides }
            >
                <div>
                    <div style={ { display: 'flex', alignItems: 'center'}}>
                        <img src='Yummi.svg' alt="logo" href='/splashpage' className={classes.logo}/>
                        <Typography variant='h1' color='textPrimary'>Yummi</Typography>
                    </div>
                    <Typography variant='h3' color='textPrimary'>Data can be confusing...</Typography>
                    <Typography variant='h3' color='textPrimary'>We're here to help, start using <mark className={classes.specialText}>Yummi</mark><br/>today for free!</Typography>
                </div>
                <Button className = { classes.button } size={ 'large' } color='secondary' variant='contained' endIcon={ <LoginRoundedIcon /> }  >
                    <Typography variant='h3'> Sign-Up </Typography>
                </Button>
            </Grid> {/* END LEFT */ }

            {/* RIGHT */ }
            <Grid
                item xs={ 12 } s={ 12 } md={ 6 } lg={ 6 }
                className={ classes.sides }
            >
                <img src={svgGraph} alt="graph" />
            </Grid> {/* END RIGHT */}
        </Grid>
      );
}
    

{/* <img src='Yummi.svg' alt="logo" href='/splashpage' className={classes.logo}/>
<Typography variant='h1'>Yummi</Typography> */}