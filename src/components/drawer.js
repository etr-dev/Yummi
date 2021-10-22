import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    Typography,
    makeStyles,
    Card
} from '@material-ui/core/';


const useStyles = makeStyles((theme) => {
    return {
        card: {
            backgroundColor: theme.palette.primary.main,
        }
      
    }
  })

export default function MyDrawer() {
    const classes = useStyles()

    return (
        <Card elevation = { 16 } className={classes.card}>
            <List>
                <ListItem>1</ListItem>
                <ListItem>2</ListItem>
                <ListItem>3</ListItem>
                <ListItem>1</ListItem>
                <ListItem>2</ListItem>
                <ListItem>3</ListItem>
                <ListItem>1</ListItem>
                <ListItem>2</ListItem>
                <ListItem>3</ListItem>
                <ListItem>1</ListItem>
                <ListItem>2</ListItem>
                <ListItem>3</ListItem>
            </List>
        </Card>
     );
}