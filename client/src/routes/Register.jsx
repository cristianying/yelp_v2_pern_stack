import React, { Fragment,useState } from 'react'
import {Link} from "react-router-dom"
import { toast } from 'react-toastify'

import { useNavigate } from "react-router-dom";
import RestaurantFinder from '../apis/RestaurantFinder'

const Register = ({setAuth}) => {

    
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password:"",
        name: ""
    });

    const {email,password,name}=inputs; 
    //console.log(email,password,name);

    const onChange = (e) =>{
        setInputs({...inputs, [e.target.name]: e.target.value});
        
        //console.log(e.target.name,e.target.value);
    }


    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            // const body = {email, password, name}
            // const response = await fetch("http://localhost:4001/auth/register",{
            //     method:"POST",
            //     headers: {"Content-Type" : "application/json"},
            //     body : JSON.stringify(body)
            // });

            const res = await RestaurantFinder.post("/auth/register", 
                { 
                    email,
                    password,
                    name
                }

                );

            //const parseRes = await response.json();
            //console.log(parseRes)
            if (res.data.token){
                localStorage.setItem("token", res.data.token);
                //setAuth(true);
                
                toast.success("Registered successfully!")
                navigate(`/login`)
            } else {
                setAuth(false);
                toast.error(res)
            }

        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <div className="container col-5">
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type ="email" name="email" 
                    placeholder="email" className="form-control my-3"
                    value={email}
                    onChange = {e => onChange(e)}
                    />
                <input 
                    type ="password" name="password" 
                    placeholder="password" className="form-control my-3"
                    value={password}
                    onChange = {e => onChange(e)}
                    />
                <input 
                    type ="text" name="name" 
                    placeholder="name" className="form-control my-3"
                    value={name}
                    onChange = {e => onChange(e)}
                    />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">Login</Link>
            </div>
        </Fragment>
    )
}

export default Register