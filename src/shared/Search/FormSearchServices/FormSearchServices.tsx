import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import { itemRequestSuccess } from '../../../store/actionCreator/item'
import { SearchIcon } from '../../Icons'

import styles from './formsearchservices.css'

export function FormSearchServices () {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const handleClick = () => {}
  const handleSubmith = (e: FormEvent) => {
    e.preventDefault()
    dispatch(itemRequestSuccess(value))
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.value.toLowerCase() === 'маникюр') {
      setValue('маникюр')
      dispatch(itemRequestSuccess('маникюр'))
    } else if (e.target.value.toLowerCase() === 'мебель') {
      setValue('мебель')
      dispatch(itemRequestSuccess('мебель'))
    } else if (e.target.value.toLowerCase() === 'продукты') {
      setValue('продукты')
      dispatch(itemRequestSuccess('продукты'))
    } else {
      setValue('')
      dispatch(itemRequestSuccess(''))
    }
  }
  return (
    <form
      onSubmit={(event: FormEvent) => {
        handleSubmith(event)
      }}
      className={styles.form}
      action=""
    >
      <input onChange={handleChange} placeholder="Search" className={styles.input} type="text" />
      <button onClick={handleClick} className={styles.button}>
        <SearchIcon />
      </button>
    </form>
  )
}
