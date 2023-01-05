import React, { useEffect, useState } from 'react';
import { getCookie, setCookie } from '../../../../utils/js/cookie';
import { EColor, Text } from '../../Text';
import conf from '../../../../../public/conf.docx'
import cookies from '../../../../../public/cookies.docx'
import styles from './agreementcookiepopup.css';
import EnvConfig from '../../../../config/env';

export function AgreementCookiePopup() {
  const [isView, setIsView] = useState(false);

  const handleClickAgree = () => {
    setCookie('cookies_policy', 'true', 365);
    setIsView(false);
  }

  useEffect(() => {
    if (!getCookie('cookies_policy')) {
      setIsView(true);
    }
  },[]);

  if(!isView) {
    return <React.Fragment/>
  }

  return (
    <div className={styles.popup}>
      <Text color={EColor.white} size={12}>
        Мы используем файлы cookies для улучшения работы сайта. Оставаясь на нашем сайте, вы соглашаетесь с условиями
        использования файлов cookies. Ознакомиться с нашими Положениями <a className={styles.link} href={`https://docs.google.com/viewer?url=${EnvConfig.frontUrl + conf}`} target="_blank">о конфиденциальности</a> и <a className={styles.link} href={`https://docs.google.com/viewer?url=${EnvConfig.frontUrl + cookies}`} target="_blank">
          использовании файлов cookie</a>.
      </Text>
      <button onClick={handleClickAgree} className={styles.button}>Я согласен</button>
    </div>
  );
}
