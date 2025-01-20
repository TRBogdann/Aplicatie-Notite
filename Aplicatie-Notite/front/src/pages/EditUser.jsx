import React, { useState } from "react";
import "./edituser.css"; // Ensure you import the CSS file

const EditUser = ({ currentUser, onUpdate }) => {
  const [username, setUsername] = useState(currentUser?.username || "");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    if (photo) {
      formData.append("photo", photo);
    }

    setIsEditing(false);

    const response = await fetch("http://locahost:2020/api/user/update", {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    const result = await response.json();
    if (result.success) {
      onUpdate(result.user);
      alert("Profile updated successfully");
    } else {
      alert("Error updating profile");
    }
  };
 
const handleEdit = () => {
    setIsEditing(true); 
    setUsername(currentUser?.username || "default_username");
     // Fill the fields with values from currentUser
};

  return (
    <div id="body">
        <canvas id="pfp">
        {currentUser?.photoUrl && (
            <img id="pfp" src={currentUser.photoUrl} alt="Profile"/>
        )}
        </canvas>
        <div id="data" >
        <form id="credentials" onSubmit={handleSubmit}>
            <label id="username">
            Username:
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!isEditing}
            />
            </label>
            <label id="password">
            Password:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isEditing}
            />
            </label>
            <label id="photo">
            Change Photo
            <input type="file" accept="image/*" onChange={handleFileChange} disabled={!isEditing} />
            </label>
            <div id="buttons">
            <button type="submit" disabled={!isEditing}>Update</button>
            <button type="button" id="edit" onClick={handleEdit} >Edit</button>
            </div>
        </form>
        </div>
    </div>
  );
};

export default EditUser;
