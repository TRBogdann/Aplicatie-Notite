import { useEffect, useState } from 'react';
import './main.css'
import cat from  './cat.jpeg';
import Groupview from '../components/GroupView';
import Friendsview from '../components/FriendsView';
import NoteView from '../components/NoteView';
import NoteNav from '../components/NoteNav';
import { useNavigate } from 'react-router-dom';

function Mainpage()
{

    const [user,setUser] = useState({
        user_id:"",
        username:"Guest",
        first_name:"Guest",
        last_name:"Guest",
        email:"guest@stud.ase.ro",
        creation_date:"2025",
        profile_image:null
    });
    const [deleted,setDeleted] = useState(false);
    const [count,setCount] = useState(0);
    const [groups,setGroups] = useState([]);
    const [friends,setFriends] = useState([]);
    const [contentView,setContentView] = useState(0);
    const [current,setCurrent] = useState(<div></div>);
    const [notes,setNotes] = useState([]);
    const [search,setSearch]=useState("");
    const [navbar,setNavBar]=useState(<NoteNav changeSearch={changeSearch} changeFilter={changeFilter} />);
    const [filters,setFilters] = useState({search:"",date:"",keyWord:""})
    const colvec = ["#50514f","#f25f5c","#ffe066","#247ba0","#70c1b3"];


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
    }
    
    req.send(formData);

}

function getNotes()
{
    const formData = new FormData();
    formData.append("id",window.localStorage.getItem("session_id"));
    formData.append("search",search);
    const req = new XMLHttpRequest();
    
    req.open("POST","http://localhost:2020/session/searchnotes");
    
    req.onload = ()=>
    {
        setNotes(JSON.parse(req.responseText).notes);
    }
    
    req.send(formData);
}

function getUser()
{
    const formData = new FormData();
    formData.append("id",window.localStorage.getItem("session_id"));
    formData.append("search",search);
    const req = new XMLHttpRequest();
    
    req.open("POST","http://localhost:2020/session/user");
    
    req.onload = ()=>
    {
        setUser(JSON.parse(req.responseText));
    }
    
    req.send(formData);
}

function getNotifications()
{
    
}


  

function filter()
{
    
    let filtered = false;
    let result = notes;
    if(filters.search!=="")
    {
        let temp = result;
        result = [];
        for(const it of temp)
        {
            const val = it.md_data.substr(0,100).toUpperCase();
            console.log(val);
            if(val.includes(filters.search.toUpperCase()))
                result.push(it);
        }
        filtered = true;
    }


    if(filters.date!=="")
    {
        let temp = result;
        result = [];
        const [day, month, year] = filters.date.split("/").map(Number);
        for(const it of temp)
        {
            const date = new Date(it.creation_date);
            const day1 = date.getDate();
            const month1 = date.getMonth()+1; 
            const year1 = date.getFullYear();
            if(Number(day1)==day && Number(month1)==month && Number(year1)==year)
                result.push(it);
        }
        filtered = true;
    }

    if(filters.keyWord!=="")
    {
        let temp = result;
        result = [];
        for(const it of temp)
        {
            let found = false;
            const vec = it.cuvinte_cheie.split(",");
            for(const it of vec)
            {
                if(it.toUpperCase()===filters.keyWord.toUpperCase()) found=true;
            }
            if(found)
            {
                result.push(it);
            }
        }
        filtered = true;
    }

    return filtered?result:notes;
}


function createGroups()
{

    console.log(groups[0].group_id);
    let rows = []
        
    rows.push(<Groupview group={{group_name:"My Activity",group_image:null}} onClick={()=>{setSearch("");setFilters({search:"",date:"",keyWord:""});setFilter(false)}}></Groupview>)
    
    for(const gr of groups)
        rows.push(<Groupview group={gr} onClick={()=>{setSearch(gr.group_id);setFilters({search:"",date:"",keyWord:""});setFilter(false)}}/>);
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

function createNoteView()
{
    let rows = []
    let i=1;
    for(const note of filter(notes))
    {
        rows.push(<NoteView note={note} color={colvec[i%colvec.length]} fn={()=>setDeleted(!deleted)}></NoteView>);
        i++;
    }
    return rows;
}

function getDate()
{

}

function changeFilter(date,keyWord)
{

    setFilters((prevFilters) => ({
        ...prevFilters,
        date: date,
        keyWord: keyWord,
    }));
    
}

function changeSearch(searchStr)
{
    setFilters((prevFilters) => ({
        ...prevFilters,
        search: searchStr
    }));
}



useEffect(()=>{
    getGroups();
    getFriends();
    getNotes();
    getUser();
},[]);

useEffect(()=>{
    getNotes();
},[search,deleted]);

useEffect(()=>{
    console.log(filters);
},[filters]);

useEffect(()=>{
    switch (contentView)
    {
        case 1:
            setCurrent(createGroups());
            setNavBar(<NoteNav changeSearch={changeSearch} changeFilter={changeFilter} />);
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
                <img className="profilePic" src={user.profile_image==null?cat:user.profile_image}></img>
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
            {navbar}
        </div>
        <div className="noteView">
            {createNoteView()}
        </div>
        </div>

        </div>
    );
}

export default Mainpage;