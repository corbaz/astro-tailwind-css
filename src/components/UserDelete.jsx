import React from 'react';

const UserDelete = ({ userId }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        // Handle success (e.g., update user list)
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default UserDelete;
