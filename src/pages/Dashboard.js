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

const graphMaxHeight=window.innerHeight/2 + 20

const useStyles = makeStyles((theme) => {
  return {
    background: {
      backgroundColor: theme.palette.primary.main,
    },
    drawer: {
      display: 'flex',
      maxHeight: graphMaxHeight,
      scrollbarWidth: 100
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
      paddingTop: 50,
      textAlign: 'center'
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
      <Grid container>
        <Grid className={ classes.drawer } item xs={12} md={3} lg={2}>
          <Card elevation={ 8 } className={ classes.card }>
            <Box className={classes.header}>
              <Typography variant="h4" color="textSecondary" component="h2" gutterBottom>
                Hello
              </Typography>
            </Box>
            <List className={classes.list}>
                  { itemNames.map(entry =>
                    <ListItem button={true} divider={ true }>
                      <Typography variant='h5'>{ entry }</Typography>
                    </ListItem>
                  ) }
            </List>
          </Card>
        </Grid>
        <Grid className={ classes.grid }item xs={12} md={9} lg={10}>
          <GraphCard/>
        </Grid>
      </Grid>
    </div>
  )
}