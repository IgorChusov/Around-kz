import React from 'react'
import Select, { StylesConfig } from 'react-select'

const customStyles: StylesConfig = {
  option: (provided, state) => {
    const color = state.isSelected ? 'white' : '#038175'
    const padding = '15px 25px'
    const backgroundColor = state.isSelected ? '#038175' : 'white'
    const alignItems = 'center'
    return { ...provided, color, padding, backgroundColor, alignItems }
  },
  control: () => ({
    display: 'flex',
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
  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0px 0px',
    margin: '0',
  }),
  menu: (provided, state) => ({
    ...provided,
    minWidth: '110px',
  }),
}
export type TListOptionsMonth = { value: number; label: string }[]
interface ISelectMonth {
  listOptions: TListOptionsMonth
  onChangeOption: (e: { value: number; label: string }) => void
  selectedMonth: number
}

export function SelectMonth (props: ISelectMonth) {
  return (
    <Select
      onChange={(e: any) => {
        props.onChangeOption(e)
      }}
      value={props.listOptions.filter(function (option) {
        return option.value === props.selectedMonth
      })}
      options={props.listOptions}
      styles={customStyles}
    />
  )
}
