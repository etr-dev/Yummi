import React, { useState } from 'react'
import {
  makeStyles,
  Grid,
  Typography,
  Card,
  List, ListItem, Box
} from '@material-ui/core'
import GraphCard from '../components/graph.js'
import MyDrawer from '../components/drawer'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { formHelperTextClasses } from '@mui/material';

const graphMaxHeight=window.innerHeight/2 + 20

const useStyles = makeStyles((theme) => {
  return {
    background: {
      backgroundColor: theme.palette.primary.main,
    },
    drawer: {
      display: 'flex',
      maxHeight: graphMaxHeight,
    },
    grid: {
      maxHeight: graphMaxHeight,
    },
    card: {
      backgroundColor: theme.palette.primary.main,
      maxHeight: '100%',
      minWidth: '100%',
      overflow: 'auto',
    },
    header: {
      minWidth: '100%',
      paddingTop: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    icons: {
      color: theme.palette.secondary.main,
      opacity: .6,

      '&:hover': {
        color: theme.palette.info.main,
        opacity:1
      }
    }
  }
})

const itemNames = [
  'Big Mac', 'Quarter Pounder with Cheese', 'Double Quarter Pounder with Cheese', 'Filet-O-Fish',
  '2 Cheeseburgers', 'Southern Style Chicken', 'Bacon Clubhouse Burger', 'Chicken McNuggets - 20pc',
  'Small French Fry', 'Medium French Fry', 'McDouble', 'Buffalo Ranch McChicken', 'Quarter Pounder with Cheese', 'Double Quarter Pounder with Cheese', 'Filet-O-Fish',
  '2 Cheeseburgers', 'Southern Style Chicken', 'Bacon Clubhouse Burger', 'Chicken McNuggets - 20pc',
  'Small French Fry', 'Medium French Fry', 'McDouble', 'Buffalo Ranch McChicken'
]

export default function Create() {
  const classes = useStyles()
  return (
    <div className={ classes.background }>
      
      <Typography variant="h6" color="textSecondary" component="h2" gutterBottom>
      </Typography>

      {/* HEADER FOR LIST*/}
      <Grid className={ classes.drawer } item xs={12} md={3} lg={2}>  
        <Box className={ classes.header }>
          <KeyboardArrowLeftIcon className={ classes.icons } fontSize={'large'}/>
          <Typography variant="h4" color="textSecondary" component="h2" gutterBottom>
            Menu Items
          </Typography>
          <KeyboardArrowRightIcon className={ classes.icons } fontSize={'large'}/>
        </Box>
      </Grid>

      {/* LIST DRAWER */}
      <Grid container>
        <Grid className={ classes.drawer } item xs={12} md={3} lg={2}>
          <Card elevation={ 8 } className={ classes.card }>
            <List className={classes.list}>
                  { itemNames.map(entry =>
                    <ListItem button={true} divider={ true }>
                      <Typography variant='h5'>{ entry }</Typography>
                    </ListItem>
                  ) }
            </List>
          </Card>
        </Grid>

        {/* CHART */}
        <Grid className={ classes.grid }item xs={12} md={9} lg={10}>
          <GraphCard/>
        </Grid>
      </Grid>
    </div>
  )
}