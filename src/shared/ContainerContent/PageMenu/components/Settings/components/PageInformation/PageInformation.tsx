import React from 'react';
import { ButtonBack } from '../../../../../../universalComponent/ButtonBack';
import { EColor, Text} from '../../../../../../universalComponent/Text';
import styles from './pageinformation.css';
import licence from '../../../../../../../../public/licence.docx'
import cookies from '../../../../../../../../public/cookies.docx'
import conf from '../../../../../../../../public/conf.docx'
import EnvConfig from '../../../../../../../config/env';

export function PageInformation() {
  return (
    <div className={styles.container}>
      <ButtonBack addressLink='/menu/account/settings' />
      <Text className={styles.title} As='h2' size={24} color={EColor.greenMiddle}>Информация</Text>
      <a href={`https://docs.google.com/viewer?url=${EnvConfig.frontUrl + cookies}`} className={styles.button} target="_blank">Политика использования Cookies</a>
      <a href={`https://docs.google.com/viewer?url=${EnvConfig.frontUrl + conf}`} className={styles.button} target="_blank">Политика конфиденциальности</a>
      <a href={`https://docs.google.com/viewer?url=${EnvConfig.frontUrl + licence}`} className={styles.button} target="_blank">Лицензионное соглашение</a>
    </div>
  );
}
