
import {  Navigate } from 'react-router-dom'
import  useAuthContext  from '@/hooks/useAuthContext'
function PublicRouter({children } :{ children : React.ReactNode}) {
  const { isAuth } = useAuthContext()
  return (
    isAuth ?  <Navigate  to='/'/> : children
   )
}

export default PublicRouter