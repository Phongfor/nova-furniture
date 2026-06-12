import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../../services/axiosClient'


const OAuth2Callback = () => {
  const navigate = useNavigate()

 useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      axiosClient.post(`/auth/oauth2/token`, { code })
  .then(res => {
    const { accessToken, refreshToken } = res.data.result
    
    localStorage.setItem('token', accessToken)        // đổi thành 'token'
    localStorage.setItem('refreshToken', refreshToken)
    
    window.location.href = '/'  
  })
  .catch(() => navigate('/auth'))
    } else {
      navigate('/auth')
    }
  }, [])
  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-lg'>Đang đăng nhập...</p>
    </div>
  )
}

export default OAuth2Callback