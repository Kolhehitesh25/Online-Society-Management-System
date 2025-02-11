import React from 'react'

const AdminProfile = ({user}) => {
  return (
    <div>
       <div style={{ textAlign: 'center', padding: '10px' }}>
      <h4>{user.firstName} {user.lastName}</h4>
      <p><strong>Role:</strong> Admin</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Access Level:</strong> Full</p>
    </div>
    </div>
  )
}
//Admin
export default AdminProfile
