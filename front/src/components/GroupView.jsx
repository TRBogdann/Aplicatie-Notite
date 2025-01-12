import { useEffect, useState } from 'react';
import groupImg from './group.jpg';
import './gview.css'
function Groupview(props)
{
    const [grImg,setGrImg] = useState(groupImg);


    
    const destructor = props;
    const group = destructor.group;

    useEffect(()=>{
        if(group.group_image!=null)
            setGrImg(group.group_image);
    },[]);


    return (
        <div className="groupViewItem" onClick={destructor.onClick}>
        <img src={grImg}></img>
        <div className='groupName'>{group.group_name}</div>
        </div>
    );
}

export default Groupview;