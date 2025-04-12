import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

interface UserListProps {
  // Define any props here, if needed
}

const UserList: React.FC<UserListProps> = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
