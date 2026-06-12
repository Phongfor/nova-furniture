import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../../services/axiosClient'


const OAuth2Callback = () => {
  const navigate = useNavigate()

 useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      axiosClient.post(`/auth/oauth2/token`, { code })  // body, không phải query param
        .then(res => {
          localStorage.setItem('accessToken', res.data.result.accessToken)   // thêm .result
          localStorage.setItem('refreshToken', res.data.result.refreshToken) // thêm .result
          navigate('/')
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