import React from 'react';
import classnames from 'classnames';
import styles from './menucontainer.css';

export function MenuContainer({children, isMaxHeight}:{children:React.ReactNode, isMaxHeight?: boolean}) {
  return (
    <div className={classnames(styles.container, {
      [styles.max]:isMaxHeight
    })}>
      {children}
    </div>
  );
}
