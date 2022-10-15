import React from 'react';
import { IconElementPlus, IconPan } from '../../Icons';
import { Text, EColor } from '../Text';
import styles from './changeitem.css';

interface IProps {
  handleClick: () => void
  value: 'new' | string
}

export function ChangeItem({value, handleClick}: IProps) {
  return (
    <button onClick={handleClick} className={styles.btn}>
      {value === 'new' ? (
        <>
          <Text color={EColor.greenMiddle} size={16}>
            Добавить
          </Text>
          <IconElementPlus classNameSvg={styles.horizontalPlus} />
          <IconElementPlus classNameSvg={styles.verticalPlus} />
        </>
      ) : (
        <>
          <Text As="p" size={16}>
            {value}
          </Text>
          <IconPan />
        </>
      )} 
    </button>
  );
}
