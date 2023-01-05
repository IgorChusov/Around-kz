import React from 'react';
import cn from 'classnames'
import styles from './popup.css';

export function Popup({children, className}: {children: React.ReactNode, className: string}) {
  return (
    <div className={cn(styles.popup, className)}>
      {children}
    </div>
  );
}
