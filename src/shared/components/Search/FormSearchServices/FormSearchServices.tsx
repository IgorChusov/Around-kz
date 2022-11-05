import React, { ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TValueArea } from '../../../../store/actionCreator/valueArea'
import { TValueSearch, valueSearch } from '../../../../store/actionCreator/valueSearch'
import { AllBusinessmenUserAsync } from '../../../../store/businessman/all/action'
import { RootState } from '../../../../store/reducer'
import { SearchIcon } from '../../../Icons'
import styles from './formsearchservices.css'

export function FormSearchServices () {
  const valueInputSearch = useSelector<RootState, TValueSearch>((state) => state.dataSearch)
  const valueArea = useSelector<RootState, TValueArea | null>((state) => state.valueArea)
  const dispatch = useDispatch()

  const handleSubmith = (e: FormEvent) => {
    e.preventDefault()
    if(valueInputSearch.valueSearch.length > 0 && valueArea) {
      dispatch(valueSearch({valueSearch: valueInputSearch.valueSearch, view: true}))
      
      dispatch(AllBusinessmenUserAsync(valueInputSearch.valueSearch, valueArea))
    } else {
      dispatch(valueSearch({valueSearch: '', view: false}))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(valueSearch({valueSearch: e.target.value, view: false}))
  }

  return (
    <form
      onSubmit={(event: FormEvent) => {
        handleSubmith(event)
      }}
      className={styles.form}
      action=""
    >
      <input 
        onChange={handleChange} 
        value={valueInputSearch.valueSearch}
        placeholder="Search" 
        className={styles.input} 
        type="text" 
      />
      <button className={styles.button}>
        <SearchIcon />
      </button>
    </form>
  )
}
