import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectCurrentToken, setCredentials, useRefreshMutation } from '~/redux/authSlice'

const PersistLogin = () => {
  const [refresh] = useRefreshMutation()
  const [isLoading, setIsLoading] = useState(true)
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch()

  useEffect(() => {
    let isMouted = true

    const verifyRefreshToken = async () => {
      try {
        const res = await refresh().unwrap()
        if (res) {
          dispatch(
            setCredentials({
              token: res.token,
              user: res.user
            })
          )
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    return () => {
      isMouted = false
      !token ? verifyRefreshToken() : setIsLoading(false)
    }
  }, [])

  return isLoading ? <p>is loading...</p> : <Outlet />
}

export default PersistLogin
