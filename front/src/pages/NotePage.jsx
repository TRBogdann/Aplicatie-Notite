import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./notePage.css";

function NotePage()
{

    const [note,setNote] = useState("Loading...");
    const [searchParams, setSearchParams] = useSearchParams();
    const [attachments,setAttachment] = useState([]);
    const [col,setCol] = useState("#f25f5c");
    const history = useNavigate();
    const [group,setGroup] = useState("");

    function getNote()
    {
        const note_id = searchParams.get("id");
        if(note_id==null)
        {
            setNote("404 Not Found");
        }
        else
        {
            
            const form = new FormData();
            form.append("id",window.localStorage.getItem("session_id"));
            form.append("note_id",note_id);
            
            const req = new XMLHttpRequest();
            req.open("POST","http://localhost:2020/session/getnote");
            req.onload = ()=>
            {
                if(req.status!=200)
                    setNote("404 Not Found");
                else
                {
                    const res = (JSON.parse(req.responseText));
                    console.log(res.attachments);
                    setNote(res.md_data);
                    setAttachment(res.attachments);
                }
                
            }
            req.send(form);

        }
    }

    function noteToGroup()
    {
        const form = new FormData();
        form.append("id",window.localStorage.getItem("session_id"));
        form.append("note_id",searchParams.get("id"));
        form.append("group_name",group);

        console.log(form);
        
        const req = new XMLHttpRequest();
        req.open("POST","http://localhost:2020/session/notetogroup");
        req.onload = ()=>
        {
            console.log(req.status);
        }

        req.send(form)
        
    }

    function download(file_id,filename)
    {
        const form = new FormData();
        form.append("id",window.localStorage.getItem("session_id"));
        form.append("note_id",searchParams.get("id"));
        form.append("file_id",file_id);

        const req = new XMLHttpRequest();
        req.open("POST","http://localhost:2020/session/downloadfile");

        req.onload = ()=>
        {
            if(req.status==200)
            {
                console.log(req.response);

                const arrayBuffer = req.response;

                const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' }); // Adjust MIME type if needed

                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            }
        }

        req.send(form);
    }

    function addAttachemnts()
    {
        const rows = [];
        for(const it of attachments)
        {
            rows.push(<div>
                <div>{it.name}</div>
                <button className="buttonTemplate" onClick={() => download(it.file_id,it.name)
                }>Download</button>
            </div>);
        } 
        return rows;
    }

    useEffect(()=>
    {
        const newCol = searchParams.get("color");
        if(newCol!=null)
            setCol(newCol);
        getNote();
    },[]);



    return (
        <div className="paperConatiner">
        <div className="attachmentView">
            {addAttachemnts()}
        </div>
    <button className="buttonTemplate" onClick={()=>
            {
                navigator.clipboard.writeText(window.location.href);
                alert("Copied!! If your note isn t private you can share it with others");
            }
        }>Copy to clipboard</button>
        <button className="buttonTemplate" onClick={(ev)=>
            {
                ev.preventDefault();
                const urlParams = new URLSearchParams();
                urlParams.set("id",searchParams.get("id"));
    
                history("/editnote?"+urlParams.toString());
            }
        }>Edit Note</button>
        <input className="input_search" type="text" placeholder="Group Name" onChange={(e)=>
            {
                setGroup(e.target.value);
            }
        } ></input>
        <button className="buttonTemplate" onClick={()=>
            {
                console.log(group)
                noteToGroup();
            }
        }>Add</button>
        <div className="paper" style={{backgroundColor:col}} dangerouslySetInnerHTML={{__html:note}}>

        </div>
        </div>
    );
}

export default NotePage;