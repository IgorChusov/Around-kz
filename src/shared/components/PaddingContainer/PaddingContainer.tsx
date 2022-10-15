import React from 'react';
import styles from './paddingcontainer.css';

export function PaddingContainer({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
