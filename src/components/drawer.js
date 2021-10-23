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
  
const itemNames = [
    'Big Mac', 'Quarter Pounder with Cheese', 'Double Quarter Pounder with Cheese', 'Filet-O-Fish',
    '2 Cheeseburgers', 'Southern Style Chicken', 'Bacon Clubhouse Burger', 'Chicken McNuggets - 20pc',
    'Small French Fry', 'Medium French Fry', 'McDouble', 'Buffalo Ranch McChicken'
]


export default function MyDrawer() {
    const classes = useStyles()

    return (
        <Card elevation = { 8 } className={classes.card}>
            <List style={{maxHeight: '100%', overflow: 'auto'}}>
                { itemNames.map(entry =>
                    <ListItem>{ entry }</ListItem>
                ) }
            </List>
        </Card>
     );
}