import React from 'react'

const StaffProfile = ({user}) => {
  return (
    <div>
        <div style={{ textAlign: 'center', padding: '10px' }}>
      <h4>{user.firstName} {user.lastName}</h4>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Department:</strong> {user.department}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
    </div>
  )
}

export default StaffProfile
