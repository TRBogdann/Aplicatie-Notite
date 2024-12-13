import { useState } from 'react';
import './login.css'

function LogIn()
{
    const [user,setUser] = useState({username:"",password:""});

    function send(data)
    {
        if(data.username!=="" && data.password!=="")
        {
            const formData = new FormData();
            formData.append("username",data.username);
            formData.append("password",data.password);

            const req = new XMLHttpRequest();
            
            req.open("POST","http://localhost:2020/login");
            
            req.onload = ()=>
            {
                console.log(req.response);
            }
            
            req.send(formData);
        }
    }

    return(
        <div className="login_container">
        <form>
        <div>
        <label>Username or Email</label>
        <input onChange={(e)=>{user.username = e.target.value; setUser(user);}} type="text"></input>
        </div>
        <div>
        <label>Password</label>
        <input onChange={(e)=>{user.password = e.target.value; setUser(user);}} type='password'></input>
        </div>
        <input onClick={(e)=>{e.preventDefault(); send(user);}} value='Log In' type='submit'></input>
        </form>
        </div>
    );
}

export default LogIn;