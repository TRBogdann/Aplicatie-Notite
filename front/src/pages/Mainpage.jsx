import { useEffect, useState } from 'react';
import './main.css'
import cat from  './cat.jpeg';
import Groupview from '../components/GroupView';
import Friendsview from '../components/FriendsView';

function Mainpage()
{

    const [user,setUser] = useState({username:"TRBogdan"});
    const [count,setCount] = useState(0);
    const [groups,setGroups] = useState([]);
    const [friends,setFriends] = useState([]);
    const [contentView,setContentView] = useState(0);
    const [current,setCurrent] = useState(<div></div>)




function getGroups()
{       

        const formData = new FormData();
        formData.append("id",window.localStorage.getItem("session_id"));
        const req = new XMLHttpRequest();
        
        req.open("POST","http://localhost:2020/session/groups");
        
        req.onload = ()=>
        {
            setGroups(JSON.parse(req.responseText).groups);
        }
        
        req.send(formData);

}

function getFriends()
{
    const formData = new FormData();
    formData.append("id",window.localStorage.getItem("session_id"));
    const req = new XMLHttpRequest();
    
    req.open("POST","http://localhost:2020/session/friends");
    
    req.onload = ()=>
    {
        setFriends(JSON.parse(req.responseText).friends);
        console.log(JSON.parse(req.responseText).friends);
    }
    
    req.send(formData);

}

function getNotifications()
{
    
}

function createGroups()
{
    let rows = []
        
    rows.push(<Groupview group={{group_name:"My Activity",group_image:null}}></Groupview>)
    
    for(const gr of groups)
        rows.push(<Groupview group={gr}/>);
    return rows;
}

function createFriends()
{
    let rows = []
    for(const fr of friends)
    {
        rows.push(<Friendsview friend = {fr}/>)
    }
    return rows;
}



useEffect(()=>{
    getGroups();
    getFriends();
},[]);

useEffect(()=>{
    switch (contentView)
    {
        case 1:
            setCurrent(createGroups());
            break;
        case 2:
            setCurrent(createFriends());
            break;
        default:
            setCurrent(<div></div>)
    }
},[contentView]);



    return(
        <div className="mainContainer">
        <div className="navBar">
            <div className="userData">
                <img className="profilePic" src={cat}></img>
                <div className="userDataName">{user.username}</div>
            </div>
            <div className="navButtons">
            <button onClick={()=>setContentView(1)}>Groups</button>
            <button onClick={()=>setContentView(2)}>Friends</button>
            <button onClick={()=>setContentView(3)}>{`Notifications(${count})`}</button>
            </div>

            <div className='viewContainer'>
            {current}
            </div>
        </div>

        <div className="noteContainer">
        <div className="noteBar">
        <div className='addContainer'>
        <button>+</button>
        <div></div>
        </div>
        </div>
        <div className="noteView"></div>
        </div>

        </div>
    );
}

export default Mainpage;