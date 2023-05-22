import React, {  useState,useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home';
import Login from './routes/Login';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import UpdatePage from './routes/UpdatePage';
import Register from "./routes/Register";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import NavBar from './Components/NavBar';
import RestaurantFinder from './apis/RestaurantFinder'
// toast.configure();


const App = () => {
    // return (
    // <RestaurantsContextProvider>
    //     <div className='container'>
    //         <Router>
    //             <Routes>
    //                 <Route exact path = "/" Component={Home}/>
    //                 <Route exact path = "/restaurants/:id" Component={RestaurantdetailPage}/>
    //                 <Route exact path = "/restaurants/:id/update" Component={UpdatePage}/>
    //                 <Route exact path = "/login" Component={Login}/>
    //                 <Route exact path = "/register" Component={Register}/>
    //             </Routes>
    //         </Router>
    //     </div>
    // </RestaurantsContextProvider>
    // )

    const [mounted, setMounted] = useState(false)
    const [isAuthenticated, setIsAuthenticated]=useState(false);

    const isAuth = async() =>{

        try {
            //console.log("localStorage.token: ", !!localStorage.token);
            
            if(localStorage.token){
                
                const res = await RestaurantFinder.get("/auth/is-verify", {
                    headers: {token: localStorage.token}
                   })

            //console.log("new json: " ,res )

            const parseRes = await res.data;

            parseRes === true ? setIsAuthenticated(true):
            setIsAuthenticated(false);
            
        }
        setMounted(true)
        } catch (error) {
            console.error(error.message);
            localStorage.removeItem("token");
        }
    }

// if(!mounted){
//     //console.log("!mounted")
//     isAuth();
// }

useEffect(() => {

    isAuth();
},[])

    const setAuth = (boolean) =>{
        setIsAuthenticated(boolean);
    }

    
   

if(mounted){
    return( 
   
    <RestaurantsContextProvider>

    
        <Router>
            <Routes>
                    <Route exact path = "/login" element={<Login setAuth={setAuth}/>}/>
                    <Route path="/register" element={<Register setAuth={setAuth}/>}/>
                    <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Home setAuth={setAuth}/>}/>
                    <Route path="/restaurants/:id" element={!isAuthenticated ? <Navigate to="/login" /> : <RestaurantdetailPage setAuth={setAuth}/>}/>
                    <Route path="/restaurants/:id/update" element={!isAuthenticated ? <Navigate to="/login" /> : <UpdatePage setAuth={setAuth}/>}/>
            </Routes>
        </Router>
    
 
    
    </RestaurantsContextProvider>
     
    
            )
        } else {

            return(
                <></>
                )}



};

export default App;