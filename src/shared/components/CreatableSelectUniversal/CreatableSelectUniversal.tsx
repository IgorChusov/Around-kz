import React from 'react'
import Select, { StylesConfig } from 'react-select'
import CreatableSelect from 'react-select/creatable'

const customStyles: StylesConfig = {
  option: (provided, state) => {
    const color = state.isSelected ? 'white' : '#038175'
    const padding = '15px 25px'
    const backgroundColor = state.isSelected ? '#038175' : 'white'
    const alignItems = 'center'
    const cursor = 'pointer'

    return {
      ...provided,
      color,
      padding,
      backgroundColor,
      alignItems,
      cursor,
      ':hover': { backgroundColor: '#F2F2F7' },
    }
  },
  control: () => ({
    display: 'flex',
    border: '2px solid #038175',
    borderRadius: '20px',
    color: '#038175',
    padding: '9px 5px',
    maxWidth: '90px',
    cursor: 'pointer',
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
    padding: '4px 0px',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0',
    width: '50px',
  }),
  menu: (provided, state) => ({
    ...provided,
    minWidth: '110px',
    left: '-10px',
    maxHeight: '210px',
  }),
  menuList: (provided, state) => ({
    ...provided,
    maxHeight: '210px',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: '0px',
  }),
  input: (provided, state) => ({
    ...provided,
  }),
}

interface IUniversalSelect {
  listOptions: { value: string; label: string }[]
  onChangeOption: (e: { value: string; label: string }) => void
  selectedValue: { value: string; label: string }
  className: string
  handleCreate: (inputValue: string) => void
}

export function CreatableSelectUniversal (props: IUniversalSelect) {
  return (
    <CreatableSelect
      autoFocus
      className={props.className}
      onCreateOption={props.handleCreate}
      onChange={(e: any) => {
        props.onChangeOption(e)
      }}
      value={props.listOptions.filter(function (option) {
        return option.value === props.selectedValue.value
      })}
      options={props.listOptions}
      styles={customStyles}
    />
  )
}
