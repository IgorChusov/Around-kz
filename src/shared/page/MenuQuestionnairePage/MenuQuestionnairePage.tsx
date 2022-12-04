import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { DeleteBusinessmenUserAsync, GetBusinessmenUserAsync } from '../../../store/businessman/get/action'
import { TGetBusinessmenState } from '../../../store/businessman/get/reduser'
import { RootState } from '../../../store/reducer'
import { IconArrowRight, IconLink } from '../../Icons'
import { ButtonBack } from '../../components/ButtonBack'
import { Loading } from '../../components/Loading'
import { EColor, Text } from '../../components/Text'
import styles from './menuquestionnaire.css'

export function MenuQuestionnairePage () {
  const dispatch = useDispatch()
  const history = useHistory()
  const businessmen = useSelector<RootState, TGetBusinessmenState>((state) => state.businessmen)
  const { id, type, typeService } = useParams<{ id?: string; type?: string; typeService?: string }>()
  const [hasLoading, setHasLoading] = useState(false)

  const loadBusinessmen = async () => {
    if(!id) return
    await dispatch(GetBusinessmenUserAsync(id))
    setHasLoading(true)
  } 

  useEffect(() => {
    loadBusinessmen()
  }, [id])

  const handleDelete = async () => {
    if(!id) return
    const resp = await dispatch(DeleteBusinessmenUserAsync(id))
    if(!resp) {
      history.push('/menu/account/business/myQuestionnaires')
    }
  }

  return (
    <div className={styles.container}>
      {businessmen.loading && (
        <Loading loading={businessmen.loading} />
      )}
      {hasLoading && (
        <>
          <ButtonBack addressLink="/menu/account/business/myQuestionnaires" />
          <Text color={EColor.greenDark} As="h2" className={styles.title} size={24}>
            {businessmen.data?.title}
          </Text>
          <ul className={styles.list}>
            <li className={styles.item}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 22.75H8C4.98 22.75 3.25 21.02 3.25 18V8.25C3.25 5.1 4.85 3.5 8 3.5C8.41 3.5 8.75 3.84 8.75 4.25C8.75 4.65 8.91 5.03 9.19 5.31C9.47 5.59 9.85 5.75 10.25 5.75H13.75C14.58 5.75 15.25 5.08 15.25 4.25C15.25 3.84 15.59 3.5 16 3.5C19.15 3.5 20.75 5.1 20.75 8.25V18C20.75 21.02 19.02 22.75 16 22.75ZM7.34998 5.02C5.76998 5.15 4.75 5.86 4.75 8.25V18C4.75 20.22 5.78 21.25 8 21.25H16C18.22 21.25 19.25 20.22 19.25 18V8.25C19.25 5.86 18.23 5.16 16.65 5.02C16.31 6.3 15.14 7.25 13.75 7.25H10.25C9.45 7.25 8.70001 6.94 8.13 6.37C7.75 5.99 7.48998 5.53 7.34998 5.02Z"
                  fill="#292D32"
                />
                <path
                  d="M13.75 7.25H10.25C9.45 7.25 8.7 6.94 8.13 6.37C7.56 5.79999 7.25 5.05 7.25 4.25C7.25 2.6 8.6 1.25 10.25 1.25H13.75C14.55 1.25 15.3 1.56 15.87 2.13C16.44 2.7 16.75 3.45 16.75 4.25C16.75 5.9 15.4 7.25 13.75 7.25ZM10.25 2.75C9.42 2.75 8.75 3.42 8.75 4.25C8.75 4.65 8.91 5.03 9.19 5.31C9.47 5.59 9.85 5.75 10.25 5.75H13.75C14.58 5.75 15.25 5.08 15.25 4.25C15.25 3.85 15.09 3.47 14.81 3.19C14.53 2.91 14.15 2.75 13.75 2.75H10.25Z"
                  fill="#292D32"
                />
                <path
                  d="M12 13.75H8C7.59 13.75 7.25 13.41 7.25 13C7.25 12.59 7.59 12.25 8 12.25H12C12.41 12.25 12.75 12.59 12.75 13C12.75 13.41 12.41 13.75 12 13.75Z"
                  fill="#292D32"
                />
                <path
                  d="M16 17.75H8C7.59 17.75 7.25 17.41 7.25 17C7.25 16.59 7.59 16.25 8 16.25H16C16.41 16.25 16.75 16.59 16.75 17C16.75 17.41 16.41 17.75 16 17.75Z"
                  fill="#292D32"
                />
              </svg>
              <Text className={styles.text} size={16}>
                Просмотр анкеты
              </Text>
              <div className={styles.right}>
                <IconArrowRight />
              </div>
              <Link
                className={styles.link}
                to={typeService === 'service' ? `/pageService/${id}` : `/pageProducts/${type}/${id}`}
              ></Link>
            </li>
            <li className={styles.item}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                  fill="#292D32"
                />
                <path
                  d="M8.49999 17.6901C7.88999 17.6901 7.32999 17.4701 6.91999 17.0701C6.42999 16.5801 6.21999 15.8701 6.32999 15.1201L6.75999 12.1101C6.83999 11.5301 7.21999 10.7801 7.62999 10.3701L15.51 2.49006C17.5 0.500059 19.52 0.500059 21.51 2.49006C22.6 3.58006 23.09 4.69006 22.99 5.80006C22.9 6.70006 22.42 7.58006 21.51 8.48006L13.63 16.3601C13.22 16.7701 12.47 17.1501 11.89 17.2301L8.87999 17.6601C8.74999 17.6901 8.61999 17.6901 8.49999 17.6901ZM16.57 3.55006L8.68999 11.4301C8.49999 11.6201 8.27999 12.0601 8.23999 12.3201L7.80999 15.3301C7.76999 15.6201 7.82999 15.8601 7.97999 16.0101C8.12999 16.1601 8.36999 16.2201 8.65999 16.1801L11.67 15.7501C11.93 15.7101 12.38 15.4901 12.56 15.3001L20.44 7.42006C21.09 6.77006 21.43 6.19006 21.48 5.65006C21.54 5.00006 21.2 4.31006 20.44 3.54006C18.84 1.94006 17.74 2.39006 16.57 3.55006Z"
                  fill="#292D32"
                />
                <path
                  d="M19.85 9.83003C19.78 9.83003 19.71 9.82003 19.65 9.80003C17.02 9.06003 14.93 6.97003 14.19 4.34003C14.08 3.94003 14.31 3.53003 14.71 3.41003C15.11 3.30003 15.52 3.53003 15.63 3.93003C16.23 6.06003 17.92 7.75003 20.05 8.35003C20.45 8.46003 20.68 8.88003 20.57 9.28003C20.48 9.62003 20.18 9.83003 19.85 9.83003Z"
                  fill="#292D32"
                />
              </svg>
              <Text className={styles.text} size={16}>
                Редактирование профиля
              </Text>
              <div className={styles.right}>
                <IconArrowRight />
              </div>
              <Link
                className={styles.link}
                to={
                  typeService === 'service'
                    ? `/menu/account/business/myQuestionnaires/${typeService}/${id}/changeInfo`
                    : `/menu/account/business/myQuestionnaires/products/${id}/changeInfo`
                }
              ></Link>
            </li>
            <li className={styles.item}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.53999 19.5201C4.92999 19.5201 4.35999 19.31 3.94999 18.92C3.42999 18.43 3.17999 17.69 3.26999 16.89L3.63999 13.65C3.70999 13.04 4.07999 12.23 4.50999 11.79L12.72 3.10005C14.77 0.930049 16.91 0.870049 19.08 2.92005C21.25 4.97005 21.31 7.11005 19.26 9.28005L11.05 17.97C10.63 18.42 9.84999 18.8401 9.23999 18.9401L6.01999 19.49C5.84999 19.5 5.69999 19.5201 5.53999 19.5201ZM15.93 2.91005C15.16 2.91005 14.49 3.39005 13.81 4.11005L5.59999 12.8101C5.39999 13.0201 5.16999 13.5201 5.12999 13.8101L4.75999 17.05C4.71999 17.38 4.79999 17.65 4.97999 17.82C5.15999 17.99 5.42999 18.05 5.75999 18L8.97999 17.4501C9.26999 17.4001 9.74999 17.14 9.94999 16.93L18.16 8.24005C19.4 6.92005 19.85 5.70005 18.04 4.00005C17.24 3.23005 16.55 2.91005 15.93 2.91005Z"
                  fill="#292D32"
                />
                <path
                  d="M17.34 10.9501C17.32 10.9501 17.29 10.9501 17.27 10.9501C14.15 10.6401 11.64 8.27009 11.16 5.17009C11.1 4.76009 11.38 4.38009 11.79 4.31009C12.2 4.25009 12.58 4.53009 12.65 4.94009C13.03 7.36009 14.99 9.22009 17.43 9.46009C17.84 9.50009 18.14 9.87009 18.1 10.2801C18.05 10.6601 17.72 10.9501 17.34 10.9501Z"
                  fill="#292D32"
                />
                <path
                  d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z"
                  fill="#292D32"
                />
              </svg>
              <Text className={styles.text} size={16}>
                Редактировать услуги/товары
              </Text>
              <div className={styles.right}>
                <IconArrowRight />
              </div>
              <Link
                className={styles.link}
                to={
                  typeService === 'service'
                    ? `/menu/account/business/myQuestionnaires/${typeService}/${id}/changeInfo/components`
                    : `/menu/account/business/myQuestionnaires/products/${id}/changeInfo/listProduct`
                }
              ></Link>
            </li>
            <li className={styles.item}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 9.25H2C1.59 9.25 1.25 8.91 1.25 8.5C1.25 8.09 1.59 7.75 2 7.75H22C22.41 7.75 22.75 8.09 22.75 8.5C22.75 8.91 22.41 9.25 22 9.25Z"
                  fill="#292D32"
                />
                <path
                  d="M8 17.25H6C5.59 17.25 5.25 16.91 5.25 16.5C5.25 16.09 5.59 15.75 6 15.75H8C8.41 15.75 8.75 16.09 8.75 16.5C8.75 16.91 8.41 17.25 8 17.25Z"
                  fill="#292D32"
                />
                <path
                  d="M14.5 17.25H10.5C10.09 17.25 9.75 16.91 9.75 16.5C9.75 16.09 10.09 15.75 10.5 15.75H14.5C14.91 15.75 15.25 16.09 15.25 16.5C15.25 16.91 14.91 17.25 14.5 17.25Z"
                  fill="#292D32"
                />
                <path
                  d="M17.56 21.25H6.44C2.46 21.25 1.25 20.05 1.25 16.11V7.89C1.25 3.95 2.46 2.75 6.44 2.75H17.55C21.53 2.75 22.74 3.95 22.74 7.89V16.1C22.75 20.05 21.54 21.25 17.56 21.25ZM6.44 4.25C3.3 4.25 2.75 4.79 2.75 7.89V16.1C2.75 19.2 3.3 19.74 6.44 19.74H17.55C20.69 19.74 21.24 19.2 21.24 16.1V7.89C21.24 4.79 20.69 4.25 17.55 4.25H6.44Z"
                  fill="#292D32"
                />
              </svg>
              <Text className={styles.text} size={16}>
                Способы оплаты
              </Text>
              <div className={styles.right}>
                <IconArrowRight />
              </div>
              <Link
                className={styles.link}
                to={`/menu/account/business/myQuestionnaires/${typeService}/${id}/changePay`}
              ></Link>
            </li>
            <li className={styles.item}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                  fill="#292D32"
                />
                <path
                  d="M15.58 19.2501C15.17 19.2501 14.83 18.9101 14.83 18.5001V14.6001C14.83 14.1901 15.17 13.8501 15.58 13.8501C15.99 13.8501 16.33 14.1901 16.33 14.6001V18.5001C16.33 18.9101 15.99 19.2501 15.58 19.2501Z"
                  fill="#292D32"
                />
                <path
                  d="M15.58 8.2C15.17 8.2 14.83 7.86 14.83 7.45V5.5C14.83 5.09 15.17 4.75 15.58 4.75C15.99 4.75 16.33 5.09 16.33 5.5V7.45C16.33 7.86 15.99 8.2 15.58 8.2Z"
                  fill="#292D32"
                />
                <path
                  d="M15.58 13.4C13.73 13.4 12.23 11.9 12.23 10.05C12.23 8.19995 13.73 6.69995 15.58 6.69995C17.43 6.69995 18.93 8.19995 18.93 10.05C18.93 11.9 17.42 13.4 15.58 13.4ZM15.58 8.19995C14.56 8.19995 13.73 9.02995 13.73 10.05C13.73 11.07 14.56 11.9 15.58 11.9C16.6 11.9 17.43 11.07 17.43 10.05C17.43 9.02995 16.59 8.19995 15.58 8.19995Z"
                  fill="#292D32"
                />
                <path
                  d="M8.42001 19.25C8.01001 19.25 7.67001 18.91 7.67001 18.5V16.55C7.67001 16.14 8.01001 15.8 8.42001 15.8C8.83001 15.8 9.17001 16.14 9.17001 16.55V18.5C9.17001 18.91 8.84001 19.25 8.42001 19.25Z"
                  fill="#292D32"
                />
                <path
                  d="M8.42001 10.15C8.01001 10.15 7.67001 9.81 7.67001 9.4V5.5C7.67001 5.09 8.01001 4.75 8.42001 4.75C8.83001 4.75 9.17001 5.09 9.17001 5.5V9.4C9.17001 9.81 8.84001 10.15 8.42001 10.15Z"
                  fill="#292D32"
                />
                <path
                  d="M8.42001 17.3001C6.57001 17.3001 5.07001 15.8001 5.07001 13.9501C5.07001 12.1001 6.57001 10.6001 8.42001 10.6001C10.27 10.6001 11.77 12.1001 11.77 13.9501C11.77 15.8001 10.27 17.3001 8.42001 17.3001ZM8.42001 12.1001C7.40001 12.1001 6.57001 12.9301 6.57001 13.9501C6.57001 14.9701 7.40001 15.8001 8.42001 15.8001C9.44001 15.8001 10.27 14.9701 10.27 13.9501C10.27 12.9301 9.45001 12.1001 8.42001 12.1001Z"
                  fill="#292D32"
                />
              </svg>
              <Text className={styles.text} size={16}>
                Настройка расписания
              </Text>
              <div className={styles.right}>
                <IconArrowRight />
              </div>
              <Link className={styles.link} to={`/menu/account/business/myQuestionnaires/${typeService}/${id}/schedule`} />
            </li>
          </ul>
          <div className={styles.buttonGroup}>
            <button className={styles.button}>
              <Text color={EColor.greenLight} size={16}>
                Заморозить анкету
              </Text>
              <IconLink />
            </button>
            <button onClick={handleDelete} className={styles.button}>
              <Text color={EColor.greenLight} size={16}>
                Удалить анкету
              </Text>
              <IconLink />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
