import { useEffect, useState } from 'react';
import cat from './cat.jpeg';
import './fview.css';

function Friendsview(props)
{
    const dest = props;
    const friend = dest.friend;
    const [profile,setProfile] = useState(cat);

    useEffect(()=>{
        if(friend.profile_image!=null)
            setProfile(friend.profile_image);
    },[]);

    return(
        <div className="friendViewItem">
        <img src={profile} ></img>
        <div className='friendName'>{friend.username}</div>
        </div>
    )
};

export default Friendsview;