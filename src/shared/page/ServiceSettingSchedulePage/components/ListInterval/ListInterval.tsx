import React from 'react';
import { ChangeItem } from '../../../../components/ChangeItem';
import { Popup } from '../../../../components/Popup';
import { Text } from '../../../../components/Text';
import styles from './listinterval.css';

export function ListInterval() {
  return (
    <Popup className={styles.container}>
      <Text className={styles.title} size={16} As='h3'>Интервалы для доставки и самовывоза</Text>
      <ChangeItem handleClick={()=> {}} value='new'/>
    </Popup> 
  );
}
