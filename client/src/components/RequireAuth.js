import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectCurrentToken } from '~/redux/authSlice'

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken)
  const location = useLocation()

  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}

export default RequireAuth
