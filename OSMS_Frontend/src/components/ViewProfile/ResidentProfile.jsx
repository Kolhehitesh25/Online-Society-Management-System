import React from 'react'

const ResidentProfile = ({user}) => {
  return (
    <div>
       <div style={{ textAlign: 'center', padding: '10px' }}>
      <h4>{user.firstName} {user.lastName}</h4>
      <p><strong>Role:</strong> Resident</p>
      <p><strong>Apartment No:</strong> {user.apartmentNumber}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
    </div>
  )
}

export default ResidentProfile
