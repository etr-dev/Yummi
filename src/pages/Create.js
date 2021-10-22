import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles, Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router-dom'
import GraphCard from '../components/graph.js'
import MyDrawer from '../components/drawer'

const useStyles = makeStyles((theme) => {
  return {
    background: {
      backgroundColor: theme.palette.primary.main,
      
      }
    
  }
})


export default function Create() {
  const classes = useStyles()
  return (
    <div className={classes.background}>
      <Typography variant="h6" color="textSecondary" component="h2" gutterBottom>
      </Typography>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <MyDrawer />
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <GraphCard />
        </Grid>
      </Grid>
    </div>
  )
}