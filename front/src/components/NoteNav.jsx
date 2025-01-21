import { useState } from 'react';
import './notenav.css';
import { useNavigate } from 'react-router-dom';

function NoteNav(params)
{
    const [vis,setVis] = useState(" hiddenItem");
    const [date,setDate]=useState("");
    const [keyWord,setKeyWord] = useState("");
    const [search,setSearch] = useState("");
    const navigate = useNavigate();
    const destruct = params;
    return(
        <div className="noteNav">
            <div className='searchBar'>
            <input type="text" placeholder="Word" onChange={(e)=>setSearch(e.target.value)}></input>
            <button className='buttonTemplate' onClick={()=>destruct.changeSearch(search)}>Search</button>
            <button className='buttonTemplate' onClick={()=>setVis(vis==""?" hiddenItem":"")}>Filter</button>
            <form className={'applyFilter'+vis}>
                <div>
                <label>Key Word</label>
                <input type="text" placeholder="Math,Sport,Cooking" onChange={(e)=>setKeyWord(e.target.value)}></input>
                </div>
                <div>
                <label>Date:</label>
                <input type="text" placeholder="27/01/2025" onChange={(e)=>setDate(e.target.value)}></input>
                </div>
                <input onClick={(e)=>{e.preventDefault();destruct.changeFilter(date,keyWord)}} type="submit" value="Apply" className='buttonTemplate'></input>
            </form>
            </div>

            <div className='btnContainer'>
            <button className='buttonTemplate' onClick={()=>navigate("/editnote")}>Add Note</button>
            <button className='buttonTemplate'>Add Friend</button>
            <button className='buttonTemplate' onClick={()=>navigate("/addgroup")}>Create Group</button>
            </div>
            
        </div>
    )
}

export default NoteNav;