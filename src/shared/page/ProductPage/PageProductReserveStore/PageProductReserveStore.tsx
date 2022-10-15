import React, { useState } from 'react'

import Select, { StylesConfig } from 'react-select'

import { Link, useParams } from 'react-router-dom'

import { EColor, Text } from '../../../components/Text'

import styles from './pageproductreservestore.css'

const options = [
  { value: '21.04', label: '21.04' },
  { value: '23.04', label: '23.04' },
]
const options2 = [
  { value: '14:00-16:00', label: '14:00-16:00' },
  { value: '16:00-18:00', label: '16:00-18:00' },
  { value: '18:00-20:00', label: '18:00-20:00' },
]
const customStyles: StylesConfig = {
  option: (provided, state) => {
    const color = state.isSelected ? 'white' : '#038175'
    const padding = '15px 25px'
    const backgroundColor = state.isSelected ? '#038175' : 'white'
    const alignItems = 'center'
    return { ...provided, color, padding, backgroundColor, alignItems }
  },
  control: () => ({
    // width: `100`,
    display: 'flex',
    border: '1px solid #038175',
    borderRadius: '20px',
    color: '#038175',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    const color = '#038175'
    return { ...provided, opacity, transition, color }
  },

  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    fill: '#038175',
    padding: '4px 0px',
  }),
}

export function PageProductReserveStore () {
  const [valueTextarea, setValueTextarea] = useState('')
  const [valueCheckbox, setValueCheckbox] = useState(false)
  const { id, type } = useParams<{ id?: string; type?: string }>()
  return (
    <div className={styles.container}>
      <Text className={styles.title} color={EColor.greenDark} size={24} As="h2">
        Вы выбрали
      </Text>
      <form action="">
        <div>
          <label className={styles.inputLabel} htmlFor="product-reserve-comment">
            Комментарий к заказу
          </label>
          <textarea
            placeholder="Ваш комментарий"
            value={valueTextarea}
            onChange={(e) => {
              setValueTextarea(e.target.value)
            }}
            className={styles.textarea}
            id="product-reserve-comment"
          ></textarea>
        </div>
        <Text className={styles.subTitle} color={EColor.greenDark} As="h3" size={16}>
          К какой дате Вам хочется получить заказ?
        </Text>
        <div className={styles.selectGroup}>
          <div className={styles.selectContent}>
            <label className={styles.selectLabel} htmlFor={'product-select-date'}>
              Дата:
            </label>
            <Select
              defaultValue={options[0]}
              options={options}
              styles={customStyles}
              id={'product-select-date'}
              className={`${styles.productSelectDate}`}
            />
          </div>
          <div className={styles.selectContent}>
            <label className={styles.selectLabel} htmlFor="product-select-time">
              Время:
            </label>
            <Select
              defaultValue={options2[0]}
              options={options2}
              styles={customStyles}
              id={'product-select-time'}
              className={`${styles.productSelectTime}`}
            />
          </div>
        </div>
        <div className={styles.checkboxContainer}>
          <div className={styles.radioGroup}>
            <input
              checked={valueCheckbox}
              onChange={(e) => {
                setValueCheckbox(e.target.checked)
              }}
              className={styles.checkboxInput}
              id={'product-reserve-checkbox'}
              type="radio"
            />
            <label className={styles.labelCheckbox} htmlFor="product-reserve-checkbox">
              Самовывоз
            </label>
          </div>
          <div className={styles.radioGroup}>
            <input
              checked={valueCheckbox}
              onChange={(e) => {
                setValueCheckbox(e.target.checked)
              }}
              className={styles.checkboxInput}
              id={'product-reserve-checkbox'}
              type="radio"
            />
            <label className={styles.labelCheckbox} htmlFor="product-reserve-checkbox">
              Доставка
            </label>
          </div>
        </div>
      </form>
      <Link to={`/pageProducts/store/${id}/payment`} className={styles.button}>
        Забронировать
      </Link>
    </div>
  )
}
