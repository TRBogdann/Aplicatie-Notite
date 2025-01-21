import { useEffect, useState } from 'react';
import './edit.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
function EditNote()
{
  const [choice,setChoice] = useState(0);
  const [files,setFiles] = useState([]);
  const [file,setFile] = useState("");
  const [count,setCount] = useState(0);
  const [fileName,setFileName] = useState('No file chosen');
  const [note,setNote] = useState({mod_partajare:0,md_data:"",cuvinte_cheie:""});
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode,setMode] = useState(0);
  const navigator = useNavigate();
  const [admin,setAdmin] = useState(true);
  const [one,setOnce] = useState(true);

  function getNote()
  {
      const note_id = searchParams.get("id");
    
          
          const form = new FormData();
          form.append("id",window.localStorage.getItem("session_id"));
          form.append("note_id",note_id);
          
          const req = new XMLHttpRequest();
          req.open("POST","http://localhost:2020/session/getnote");
          req.onload = ()=>
          {
              if(req.status!=200)
                  navigator("/editnote");
              else
              {
                  const res = (JSON.parse(req.responseText));
                  const obj = 
                  {
                    md_data:res.md_data,
                    cuvinte_cheie:res.cuvinte_cheie,
                    mod_partajare: res.mod_partajare,
                  }
                  console.log(res)
                  setAdmin(res.admin)
                  setNote(obj);
                  setChoice(res.mod_partajare)
                  
              }
              
          }
          req.send(form);

      
  }


  
  function createNote()
  {
    const formData = new FormData();
    formData.append("id",window.localStorage.getItem("session_id"))
    formData.append("files",files);
    formData.append("note",JSON.stringify(note));

    console.log(formData)
    const req = new XMLHttpRequest();
    
    req.open("POST","http://localhost:2020/session/addnote");
    
    req.onload = ()=>
    {
      console.log(req.status);
      navigator("/");
    }
    
    req.send(formData);
    navigator("/");
  }
  
  function editNote()
  {
    
    const formData = new FormData();
    formData.append("id",window.localStorage.getItem("session_id"))
    formData.append("note_id",searchParams.get("id"));
    formData.append("note",JSON.stringify(note));

    const req = new XMLHttpRequest();
    
    req.open("POST","http://localhost:2020/session/editnote");
    
    req.onload = ()=>
    {
      console.log(req.status);
      
    }
    
    req.send(formData);
    navigator("/");
  }
  
  useEffect(()=>
  {
    if(searchParams.get("id")!=null)
     {
       setMode(1);
       getNote();
     }
  },[]);

  useEffect(()=>
  {
    setCount(note.md_data.length);
  },[note]);

  function toBytes(buffer) {
    // Use uncheckedCast since we are outright lying to the compiler
    const arr = new Int8Array(buffer);
    const result = []
    for (let i = 0; i < arr.length; i++) {
        result[i] = arr[i];
    }
    return result;
}


  function createRows()
  {
    const rows = []
    
    for(const it in files)
    {
      let row =<tr>
    <td>
    <div className='newFile'>{files[it].name}</div>
    </td>
    <td>
    <button className='buttonTemplate' onClick={(e)=>{
      e.preventDefault();
      const newArr = [];
      for(let i=0;i<files.length;i++)
      {
        if(i!=it)
          newArr.push(files[it]);
      }
      setFiles(newArr);
    }
    }>Delete</button>
    </td>
    </tr>;
    rows.push(row);

    }

    return rows;
  }

  return(
  <form className="editForm">
  <div className="selectBox" style={admin==false?{display:"none"}:{display:'flex'}}>
  <label>Share Mode:</label>
  <input value="Private" type="button" className={choice==0?"shareChoice":"temp"} onClick={()=>{setChoice(0);note.mod_partajare=0;setNote(note)}}></input>
  <input value="Public: Read Only" type="button" className={choice==1?"shareChoice":"temp"} onClick={()=>{setChoice(1);note.mod_partajare=1,setNote(note)}}></input>
  <input value="Public: Read Write" type="button" className={choice==2?"shareChoice":"temp"} onClick={()=>{setChoice(2);note.mod_partajare=2;setNote(note)}}></input>
  </div>

    
    <div className='fileBox' style={mode==1?{display:"none"}:{display:'flex'}}>
      <label>Saved Files:</label>
      <table className='pickedFile'>
      {createRows()}
      </table>
      <div>{"(You can go up to 5 files)"}</div>
    </div>

    {
      files.length<5?
      <>
    <div className="attachmentBox" style={mode==1?{display:"none"}:{display:'flex'}}>
    <label htmlFor='addFileInput' className='filePickLabel'>Choose File</label>
    <input type="file" className='addFileInput' id="addFileInput" onChange={async (e)=>
    {setFileName(e.target.files[0].name);
      const newFile = e.target.files[0];
      setFile(newFile);

    }}hidden={true}></input>
    <span id="file-chosen">{fileName}</span>
    <input value="Add file" type="button" className='addFile' 
      onClick={()=>{
        if(file!=="")
        {
          files.push({byte_data:file,name:fileName});
          setFiles(files);
          setFile("");
          setFileName('No file chosen');
        }
      }}
    ></input>
    </div>
    </>:
    <></>
   }
    <div className="wordBox">
    <label>Key Words:</label>
    <input type="text" className="keyWord" placeholder='word1,word2,word3' defaultValue={note.cuvinte_cheie}  onChange={(e)=>
    {
      note.cuvinte_cheie = e.target.value;
      setNote(note);
    }
    }></input>
    </div>
    
    <div className="noteBox">
    <textarea className="mdNote" defaultValue={note.md_data} onChange={(e)=>{setCount(e.target.value.length),note.md_data=e.target.value;setNote(note)}} maxLength="20000" type="text" placeholder='Note Text Here (uses MD Format)'></textarea>
    <div>{count}/20000</div>
    </div>
    
    <input value={mode==0?"Save":"Edit"} type="submit" className='buttonTemplate' onClick={(e)=>
      {
        e.preventDefault();
        mode==0?createNote():editNote();

      }
    }></input>
  
  </form>
  );
}

export default EditNote;