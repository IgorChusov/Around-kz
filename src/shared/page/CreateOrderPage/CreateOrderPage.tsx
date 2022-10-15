import React, { ChangeEvent, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'

import { PageCreateOrderBasicInfo } from './components/PageCreateOrderBasicInfo'
import { PageCreateOrderMoreInformation } from './components/PageCreateOrderMoreInformation'
import { optionsSelectPageBasic } from './config'

export function CreateOrderPage () {
  const match = useRouteMatch()

  const [options, setOptions] = useState(optionsSelectPageBasic)
  const [selectedTrack, setSelectedTrack] = useState({ value: '1', label: '1км' })

  const [valueTags, setValueTags] = useState('')
  const [valueFrom, setValueFrom] = useState('')
  const [valueTo, setValueTo] = useState('')
  const [textareaValue, setTextaraeValue] = useState('')

  // добавление нового значения в селект области поиска
  const createValueSelectAmount = (inputValue: string) => {
    if (/[0-9]/.test(inputValue) && Number(inputValue) < 200) {
      const value = { value: inputValue, label: `${inputValue}км` }
      setOptions([...options, value])
      setSelectedTrack(value)
    }
  }

  const onChangeInputFrom = (e: ChangeEvent<HTMLInputElement>) => {
    if (/[0-9]/.test(e.target.value) || /^\s*$/.test(e.target.value)) {
      setValueFrom(e.target.value)
    }
  }

  const onChangeInputTo = (e: ChangeEvent<HTMLInputElement>) => {
    if (/[0-9]/.test(e.target.value) || /^\s*$/.test(e.target.value)) {
      setValueTo(e.target.value)
    }
  }

  return (
    <Switch>
      <Route path={`${match.url}/basic-info`}>
        <PageCreateOrderBasicInfo
          valueFrom={valueFrom}
          valueTags={valueTags}
          valueTo={valueTo}
          textareaValue={textareaValue}
          setValueTags={(e) => setValueTags(e)}
          onChangeInputFrom={(e) => onChangeInputFrom(e)}
          onChangeInputTo={(e) => onChangeInputTo(e)}
          selectedTrack={selectedTrack}
          createValueSelectAmount={(e) => createValueSelectAmount(e)}
          options={options}
          setSelectedTrack={(e) => setSelectedTrack(e)}
          setTextareaValue={(e) => setTextaraeValue(e.target.value)}
        />
      </Route>
      <Route path={`${match.url}/more-info`}>
        <PageCreateOrderMoreInformation />
      </Route>
    </Switch>
  )
}
