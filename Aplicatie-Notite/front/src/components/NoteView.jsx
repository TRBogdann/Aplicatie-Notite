
import './noteview.css';
import deleteImg from './circle.png';
import editImg from './pencil.png';

function NoteView(props)
{
    const destruct = props;
    const note = destruct.note;
    const c_date = new Date(note.creation_date);

    const year = c_date.getUTCFullYear();
    const monthName = c_date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const day = c_date.getUTCDate();

    const dateString = ""+day+" "+monthName+" "+year;

    return(
        <div className="noteViewItem" style={{backgroundColor:destruct.color}}>
        <div className="notePreview">{note.md_data}</div>
        <div className="noteFooter">
            <span>{dateString}</span>
            <div className='edContainer'>
                <img src={deleteImg}></img>
                <img src={editImg}></img>
            </div>
        </div>
        </div>
    );
}

export default NoteView;