import React, { useState } from 'react';

const EditUser = ({ currentUser, onUpdate }) => {
  const [username, setUsername] = useState(currentUser?.username || '');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    if (photo) {
      formData.append('photo', photo);
    }

    const response = await fetch('http://locahost:2020/api/user/update', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    });

    const result = await response.json();
    if (result.success) {
      onUpdate(result.user);
      alert('Profile updated successfully');
    } else {
      alert('Error updating profile');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Profile Photo:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUser;
