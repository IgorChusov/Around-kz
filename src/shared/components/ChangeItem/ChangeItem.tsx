import React from 'react';
import { IconElementPlus, IconPan } from '../../Icons';
import { Text, EColor } from '../Text';
import classnames from 'classnames';
import styles from './changeitem.css';

interface IProps {
  classButton?: string
  handleClick: () => void
  value: 'new' | string
}

export function ChangeItem({value, handleClick, classButton}: IProps) {
  return (
    <button onClick={handleClick} className={classnames(styles.btn, classButton)}>
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
