import React, { useState } from 'react';
import { ButtonBack } from '../../components/Buttons/ButtonBack';
import { PaddingContainer } from '../../components/PaddingContainer';
import { EColor, Text } from '../../components/Text';
import styles from './feedbackpage.css';

export function AccountFeedbackPage() {
  const [value, setValue] = useState('')
  
  return (
    <PaddingContainer>
      <div className={styles.container}>
        <ButtonBack addressLink='/account/settings'/>
        <Text className={styles.title} As='h2' color={EColor.greenDark} size={24}>Обратная связь</Text>
        <Text className={styles.text} As='p' color={EColor.greenDark} size={16}>Нам очень важно мнение о нашем сервисе.</Text>
        <Text className={styles.text} As='p' color={EColor.greenDark} size={16}>Если у вас есть предложение по улучшению или замечания по работе, напишите нам!</Text>
        <div className={styles.contentInput}>
          <textarea
            id={'textareaFeedback'}
            className={styles.textarea}
            placeholder="Комментарий"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label className={styles.labelTag} htmlFor="textareaFeedback">
            Не более 500 знаков
          </label>
        </div>
        <a className={styles.link} href={`mailto:&body=${value}`}>Отправить</a>
      </div>
    </PaddingContainer>
  );
}
