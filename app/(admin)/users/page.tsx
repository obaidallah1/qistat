'use client'
import React from 'react';
import { useUsers } from '@/hooks/user/useUsers'; // Adjust the import path as needed

const UsersPage: React.FC = () => {
  const { users, loading, error } = useUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Users List</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.username} ({user.email}) {/* Customize display as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;