import { useState } from 'react';
import './signup.css'

function SignUp()
{
    const [userData,setUserData] =useState({
        firstname:"",
        lastname:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    function checkData(data)
    {   
        console.log(data);
        return true;
    }

    function sendForm(data)
    {
        if(checkData(data))
        {
            const req = new XMLHttpRequest();
            const formData = new FormData();
            req.open('POST','http://localhost:2020/signup');
            
            for(const key in data)
            {
                formData.append(key,data[key]);
            }

            req.onload = ()=>
            {
                console.log(req.response);
            };
            req.send(formData);
        }
    }
    return(
        <div className="signup_container">
        <form>
        <div>
        <label>First Name</label>
        <input type="text" onChange={(ev)=>{
            userData.firstname = ev.target.value;
            setUserData(userData)
        }}></input>
        </div>
        <div>
        <label>Last Name</label>
        <input type="text"
        onChange={(ev)=>{
            userData.lastname = ev.target.value;
            setUserData(userData)
        }}></input>
        </div>
        <div>
        <label>Email</label>
        <input type="email"
        onChange={(ev)=>{
            userData.email = ev.target.value;
            setUserData(userData)
        }}></input>
        </div>
        <div>
        <label>Username</label>
        <input type="text"
        onChange={(ev)=>{
            userData.username = ev.target.value;
            setUserData(userData)
        }}></input>
        </div>
        <div>
        <label>Password</label>
        <input type="password"
        onChange={(ev)=>{
            userData.password = ev.target.value;
            setUserData(userData)
        }}></input>
        </div>
        <div>
        <label>Confirm Password</label>
        <input type="password"
        onChange={(ev)=>{
            userData.confirmPassword = ev.target.value;
            setUserData(userData)
        }}></input>
        </div>
        <input type="submit" value="Sign Up" onClick={(ev)=>
            {
                ev.preventDefault();
                sendForm(userData);    
            }
        }></input>
        </form>
        </div>
    );
}

export default SignUp;