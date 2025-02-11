import React from 'react'

const StaffProfile = ({user}) => {
  return (
    <div>
               <div style={{ textAlign: 'center', padding: '10px' ,backgroundColor:"orange" ,opacity:'0.9',borderRadius:'30px'}}>
      {/* <h4>{user.firstName} {user.lastName}</h4> */}
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>MobileNo:</strong> {user.mobileNo}</p>
    </div>
    </div>
  )
}

export default StaffProfile
