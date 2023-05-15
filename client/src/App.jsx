import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import UpdatePage from './routes/UpdatePage';

const App = () => {
    return (
    <RestaurantsContextProvider>
        <div className='container'>
            <Router>
                <Routes>
                    <Route exact path = "/" Component={Home}/>
                    <Route exact path = "/restaurants/:id" Component={RestaurantdetailPage}/>
                    <Route exact path = "/restaurants/:id/update" Component={UpdatePage}/>
                </Routes>
            </Router>
        </div>
    </RestaurantsContextProvider>
    )
};

export default App;