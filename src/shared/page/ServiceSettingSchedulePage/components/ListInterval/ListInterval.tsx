import React, { ForwardedRef, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateIntervalAsync } from '../../../../../store/businessman/action';
import { ButtonNextPage } from '../../../../components/ButtonNextPage';
import { ChangeItem } from '../../../../components/ChangeItem';
import { IntervalForm } from '../../../../components/Forms/IntervalForm';
import { Popup } from '../../../../components/popups/Popup';
import { Text } from '../../../../components/Text';
import styles from './listinterval.css';
type CountdownHandle = {
  handleSubmitForm: () => void,
}
export function ListInterval() {
  const dispatch = useDispatch()
  const formRef = useRef<null | CountdownHandle>(null)
  const [type, setType] = useState('list')

  const handleCreate = () => {
    setType('component')
  }

  // useEffect(() => {
  //   dispatch(ScheduleGetIntervalsAsync())
  // }, [])

  const handleSubmitInterval = (data: any)  => {
    dispatch(CreateIntervalAsync(data.title, data.listTime, null))
    console.log('data', data)
  }

  const handleClosePopup = () => {
    setType('list')
  }

  const onClickSubmit = () => {
    if( formRef.current) {
      formRef.current?.handleSubmitForm();
    }
  }

  return (
    <Popup className={styles.container}>
      {type === 'list' && (
        <>
          <Text className={styles.title} size={16} As='h3'>Интервалы для доставки и самовывоза</Text>
          <ChangeItem classButton={styles.button} handleClick={handleCreate} value='new'/>
          <ButtonNextPage classNameButton={styles.buttonConfirm} text='Подтвердить' onClick={() => {}}/>
          <ButtonNextPage classNameButton={styles.buttonCancel} text='Закрыть' onClick={() => {}}/>
        </>
      )}
      {type === 'component' && (
        <>
          <IntervalForm ref={formRef} onSubmit={handleSubmitInterval} />
          <ButtonNextPage 
            classNameButton={styles.buttonConfirm} 
            text='Подтвердить' 
            onClick={onClickSubmit}
          />
          <ButtonNextPage 
            isTransparentBackground 
            classNameButton={styles.buttonCancel} 
            text='Закрыть' 
            onClick={handleClosePopup}
          />
        </>
      )}
    </Popup> 
  );
}
