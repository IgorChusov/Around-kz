import React from 'react';
import {FadeLoader} from 'react-spinners';
import styles from './loading.css';

export function Loading({loading}: {loading: boolean}) {
  if (!loading) return null
  return (
    <div className={styles.content}>
      <FadeLoader color='rgb(54, 215, 183)' loading={loading} speedMultiplier={0.8} />
    </div>
  );
}
