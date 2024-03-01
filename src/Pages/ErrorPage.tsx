import React from 'react'
import { Assets } from '../Assets/Assets'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', height: '100vh' }}>
      <img src={Assets.images.ErrorPage} height='50%' width='50%' alt="" />
      <Link to='/'>Go to Home</Link>
    </div>
  )
}

export default ErrorPage