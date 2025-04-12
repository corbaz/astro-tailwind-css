import React, { useState, useEffect } from 'react';

const UserEdit = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setName(data.name);
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(data => {
        // Handle success (e.g., update user list)
      });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserEdit;
