import React from 'react'

const ResidentProfile = ({user}) => {
  const userData = JSON.parse(localStorage.getItem("user")) || {};
  return (
    <div>
        <div style={{ textAlign: 'center', padding: '10px' ,backgroundColor:"orange" ,opacity:'0.9',borderRadius:'30px'}}>

  <p><strong>Role:</strong> {user.role}</p>
  <p><strong>Email:</strong> {user.email}</p>
  <p><strong>MobileNo:</strong> {user.mobileNo}</p>
  <p><strong>FlatNo:</strong> {userData.flatNumber}</p>
</div>
    </div>
  )
}

export default ResidentProfile
