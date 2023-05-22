import React, {useEffect,useContext} from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import { Home } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import { RestaurantsContext } from '../context/RestaurantsContext'

const useStyles = makeStyles({
    root: {
      flex: 1
    },
  });

const Appbar = () => {

    const {restaurants} = useContext(RestaurantsContext);

    const classes=useStyles()
    console.log("appbaar: ",restaurants )

    useEffect(()=>{
        
    },[restaurants])
    
    return (


        <AppBar position="fixed">
            <Toolbar>
            {console.log("appbaar: rendered")}
                <Typography className={classes.root}>
                <>Welcome: </>
                {restaurants.length !==0 ? 
                    (
                    restaurants[0].user_name
                    ):
                    (<></>)}
                            
                </Typography>
                
                <Home/>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar
