import React from 'react'
import {Button, Typography,Grid} from '@material-ui/core';
import Appbar from './Appbar'
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//     offset: theme.mixins.toolbar,
//   }))

const NavBar = () => {
    // const classes = useStyles();
    
    return (
        
            <Grid container direction="column" >

                <Grid item  >
                    <Appbar/>
                </Grid>
                <div 
                // className={classes.offset}
                 />
                <Grid item container>
                    <Grid item sm={2}/>
                    <Grid item xs={12} sm={8}>
                        <Button>testing</Button>
                    </Grid>    
                    <Grid item sm={2}/>
                </Grid>
                

            </Grid>
            
      
    )
}

export default NavBar
