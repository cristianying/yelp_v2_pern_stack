import React, { Fragment,useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import RestaurantFinder from '../apis/RestaurantFinder'

const Login = ({setAuth}) => {

    const [inputs, setInputs]= useState({
        email:"",
        password: ""
    })

    let navigate = useNavigate()

    const {email,password}=inputs

    const onChange = (e)=> 
        setInputs({...inputs,[e.target.name]: e.target.value});
    
    

    const onSubmitForm = async (e) =>{
        e.preventDefault()

        try {

            // const body = {email, password}
            // const res = await fetch("http://localhost:4001/auth/login",{
            //     method:"POST",
            //     headers: {"Content-Type" : "application/json"},
            //     body : JSON.stringify(body)
            // });

            // const parseRes = await res.json();

            const res = await RestaurantFinder.post("/auth/login", 
                { 
                    email,
                    password
                }

                );


            //const parseRes = await res.json();
            //console.log(res.data.token);

            if (res.data.token){
                localStorage.setItem("token", res.data.token);
                setAuth(true);

                toast.success("logged in successfully!")
                console.log("logged in!!", res.data.token)
                navigate("/");
            } else {
                setAuth(false);
                toast.error(res)
            }
            
        } catch (error) {
            console.error(error.message)
            
        }
    }
    return (
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="email" name="email"
                    placeholder="email" className="form-control my-3"
                    value={email}
                    onChange={e =>onChange(e)}
                />
                <input 
                    type="password" name="password"
                    placeholder="password" className="form-control my-3"
                    value={password}
                    onChange={e =>onChange(e)}
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/register">register</Link>
        </Fragment>
    )
}

export default Login