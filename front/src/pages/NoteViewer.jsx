import { useState } from "react"
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import './noteViewer.css'
import { useEffect } from "react";

function NoteViewer()
{
    const [attach,setAttach] = useState([]);
    const [exists,setExists] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [note,setNote] = useState({});
    const [inner,setInner] = useState(<div></div>) 


    useEffect(()=>{
        const param = searchParams.get("note_id");
        if(param===null)
        {
            setInner(<div>404 Not Found</div>);
        }
    },[])

    return(
        <div className="dataViewer">
           {inner}
        </div>
    )
}

export default NoteViewer