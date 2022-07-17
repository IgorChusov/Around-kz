import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store/reducer'

export function useToken () {
  const [tokenLocalStorage, setTokenLocalStorage] = useState<string | null>('')
  const token = useSelector<RootState, string>((state) => state.token.tokenText)
  const tokenLocal = typeof window !== 'undefined' ? localStorage.getItem('TOKEN') : null
  useEffect(() => {
    if (tokenLocal) setTokenLocalStorage(tokenLocal)
  }, [token, tokenLocal])
  return { token, tokenLocalStorage }
}
