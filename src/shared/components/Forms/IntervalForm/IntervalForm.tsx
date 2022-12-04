import React, { ChangeEvent, forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import { Input } from '../../Input';
import InputMask from 'react-input-mask';
import moment, { Moment } from 'moment';
import { IconCancel } from '../../../Icons/IconCancel';
import { UniversalSelect } from '../../UniversalSelect';
import styles from './intervalform.css';

const listIntervalsDefault = [
  { value: '30', label: '30 мин' },
  { value: '60', label: '1ч' },
  { value: '120', label: '2ч' },
  { value: '180', label: '3ч' },
]

interface IProps {
  onSubmit: (data:any) => void
}
  
type CountdownHandle = {
  handleSubmitForm: (e: any) => void,
}

export const IntervalForm = forwardRef<CountdownHandle, IProps>(({ onSubmit }, ref) => {
  const [listIntervals, setListIntervals] = useState(listIntervalsDefault)
  const [listTime, setListTime] = useState<Moment[]>([])
  const [interval, setInterval] = useState(listIntervalsDefault[1])
  const [start, setStart] = useState('08:00')
  const { control, handleSubmit, formState, register, watch, setValue } = useForm();

  const changeSelectInterval = (e: { value: string; label: string }) => {
    setInterval(e)
  }

  const changeStart = (e: ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value)
  }

  const handleDeleteTime = (time: Moment) => () => {
    setListTime(prevState => prevState.filter((elem) => moment(elem).format('HH:mm') !== moment(time).format('HH:mm')))
  }

  useMemo(() => {
    const arr = []
    let current = moment(start, 'HH:mm');

    while(moment('23:30', 'HH:mm').isAfter(moment(current, 'HH:mm'))) {
      const time = moment(current).add(interval.value, 'minutes')
      arr.push(current)
      current = time
    }

    setListTime(arr)
  }, [interval, start])

  useImperativeHandle(ref, () => ({
    handleSubmitForm: () => {
        handleSubmit(data => {
            onSubmit({...data, listTime: listTime.map((elem) => elem.toString())})
        })()
    }
  }))

  return (
      <form onSubmit={e => e.preventDefault()} className={styles.form}>
        <Controller
          name="title"
          defaultValue=''
          control={control}
          rules={{
              required: true,
          }}
          render={({field}) => (
            <Input 
              inputRef={field.ref}
              value={field.value} 
              placeholder='...' 
              onChange={field.onChange} 
              error={!!formState.errors.title ? 'Заполните поле' : undefined}
              labelText="Название расписания"
              classNameContainer={styles.inputContainer}
            />
          )} 
        />
        <div className={styles.selectControl}>
          <span>Выберитеe временной интервал для оказания услуги</span> 
          <UniversalSelect 
            listOptions={listIntervals}
            onChangeOption={changeSelectInterval}
            selectedValue={interval}
            className=''
          />
        </div>
        <div className={styles.selectControl}>
          <span>Начало рабочего дня</span> 
          <InputMask mask="99:00"
            value={start}
            maskChar={null}
            onChange={changeStart}
            // @ts-ignore:next-line
            formatChars={{
                '9': '[0-9]'
            }}>
            {(inputProps: ControllerRenderProps) => (
              <Input
                inputRef={inputProps.ref}
                classNameContainer={styles.containerInput}
                value={inputProps.value}
                placeholder=""
                onChange={inputProps.onChange}
                labelText=""
              />
            )}
          </InputMask>
        </div>
        <h3>Настройте сеансы</h3>
        <ul className={styles.list}>
          {listTime.map((time) => (
            <li 
              className={styles.item} 
              key={moment(time).format('HH:mm')}>
                {moment(time).format('HH:mm')}
                <button onClick={handleDeleteTime(time)}><IconCancel /></button>
            </li>
          ))}
        </ul>
      </form>
  );
})
