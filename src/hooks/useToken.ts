import { useSelector } from 'react-redux'
import { RootState } from '../store/reducer'

export function useToken () {
  const token = useSelector<RootState, string>((state) => state.token.tokenText)
  const tokenLocalStorage = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  return { token, tokenLocalStorage }
}
