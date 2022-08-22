import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AllBusinessmenUserAsync } from '../../../store/businessman/all/action'

import { SearchIcon } from '../../Icons'

import styles from './formsearchservices.css'

export function FormSearchServices () {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const handleClick = () => {}

  const handleSubmith = (e: FormEvent) => {
    e.preventDefault()
    if(value.length > 0) {
      const str = value.trim().split(' ').filter(entry => /\S/.test(entry)).join('&')
      console.log(str)
      dispatch(AllBusinessmenUserAsync(str))
    }

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValue(e.target.value)
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
      <button className={styles.button}>
        <SearchIcon />
      </button>
    </form>
  )
}
