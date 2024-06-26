import { useSelector } from 'react-redux'
import { RootState } from '../store/reducer'

function useToken () {
  const token = useSelector<RootState, string>((state) => state.session.tokenText)
  const tokenLocalStorage = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  return { token, tokenLocalStorage }
}


export default useToken
