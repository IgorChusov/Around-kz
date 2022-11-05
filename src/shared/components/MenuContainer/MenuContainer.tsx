import React from 'react';
import styles from './menucontainer.css';

export function MenuContainer({children}:{children:React.ReactNode}) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
