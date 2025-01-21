
import './noteview.css';
import deleteImg from './circle.png';
import editImg from './pencil.png';
import { useNavigate} from 'react-router';

function NoteView(props)
{

    const history = useNavigate();
    const destruct = props;
    const note = destruct.note;
    const c_date = new Date(note.creation_date);

    const year = c_date.getUTCFullYear();
    const monthName = c_date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const day = c_date.getUTCDate();

    function deleteNote(note_id)
{
    const form = new FormData();
    form.append("id",window.localStorage.getItem("session_id"));
    form.append("note_id",note_id);
    
    const req = new XMLHttpRequest();
    req.open("POST","http://localhost:2020/session/deletenote");
    req.onload = ()=>
    {
        destruct.fn();
    }
    req.send(form);
}


    const dateString = ""+day+" "+monthName+" "+year;
    return(
        <div className="noteViewItem" style={{backgroundColor:destruct.color}} onClick={()=>{
            const urlParams = new URLSearchParams();
            urlParams.set("color",destruct.color);
            urlParams.set("id",note.note_id);

            history({pathname:"viewnote",search:urlParams.toString()})
        
        }}>
        <div className="notePreview">{note.md_data}</div>
        <div className="noteFooter">
            <span>{dateString}</span>
            <div className='edContainer'>
                <img src={deleteImg} onClick={(ev)=>
                    {
                        ev.stopPropagation();
                        deleteNote(note.note_id)
                }}></img>
                <img src={editImg} onClick={(ev)=>{
            ev.stopPropagation()
            const urlParams = new URLSearchParams();
            urlParams.set("id",note.note_id);

            history({pathname:"editnote",search:urlParams.toString()})
        
        }}></img>
            </div>
        </div>
        </div>
    );
}

export default NoteView;