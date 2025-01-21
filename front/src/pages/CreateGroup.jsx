import React, { useState } from "react";
import './createGroup.css';

const Group = ({ currentUser, onUpdate }) => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");

  const handleCanvasClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.getElementById('Group_img');
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height); 
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  function createGroup()
  {
    const form = new FormData();
    form.append("id",window.localStorage.getItem("session_id"));
    form.append("group_name",groupName);
    form.append("members",members);
    console.log(form);
    const req = new XMLHttpRequest();
    req.open("POST","http://localhost:2020/session/addgroup");
    req.onload = ()=>
    {
        console.log(req.status);
    }
    req.send(form);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedMembers = `${members}, ${currentUser.username}`;
    const newGroup = {
      groupName: groupName,
      members: updatedMembers,
    };
    onUpdate(newGroup);
    console.log("Group created:", newGroup);
  };

  return (
      <div id="group_body">
        <form>
          New Group:
          <div id="G_img">
            <canvas
              id="Group_img"
              width="100"
              height="100"
              onClick={handleCanvasClick}
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
          <div id="G_name">
            <label id="Group_name_lbl" htmlFor="Group_name">
              Group Name:
            </label>
            <br />
            <input
              id="Inputs"
              type="text"
              placeholder="Enter the group's name..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <br />
          </div>
          <div id="G_Members">
            <label id="Members_names_lbl" htmlFor="Members_names">
              Members:
            </label>
            <br />
            <input
              id="Inputs"
              type="text"
              placeholder="Enter the member's usernames separated by commas..."
              value={members}
              onChange={(e) => setMembers(e.target.value)}
            />
            <br />
          </div>
          <button id="btn_submit" className="buttonTemplate" type="submit" onClick={(e)=>
            {
                e.preventDefault();
                createGroup();
            }
          }>
            Create Group
          </button>
        </form>
      </div>
  );
};

export default Group;