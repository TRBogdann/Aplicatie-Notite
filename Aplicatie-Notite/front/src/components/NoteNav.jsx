import { useState } from 'react';
import './notenav.css';

function NoteNav(params)
{
    const [vis,setVis] = useState(" hiddenItem");
    const destruct = params;
    return(
        <div className="noteNav">
            <div className='searchBar'>
            <input type="text" placeholder="Word"></input>
            <button className='buttonTemplate'>Search</button>
            <button className='buttonTemplate' onClick={()=>setVis(vis==""?" hiddenItem":"")}>Filter</button>
            <form className={'applyFilter'+vis}>
                <div>
                <label>Key Word</label>
                <input type="text" placeholder="Math,Sport,Cooking"></input>
                </div>
                <div>
                <label>Date:</label>
                <input type="text" placeholder="27/01/2025"></input>
                </div>
                <input type="submit" value="Apply" className='buttonTemplate'></input>
            </form>
            </div>
            <div className='addNewNote'>
            <button className='buttonTemplateRound'>+</button>
            </div>
        </div>
    )
}

export default NoteNav;