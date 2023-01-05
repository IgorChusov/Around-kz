import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { TBusinessmenState } from '../../../store/businessman/reducer'
import { RootState } from '../../../store/reducer'
import { Loading } from '../../components/Loading'
import { PageShoppingCardServices } from '../../ContainerContent/PageService/PageShoppingCardServices'
import { ChoiceOfServices } from '../../ContainerContent/PageService/ChoiceOfServices'
import { ChoiceOfDatePage } from '../../page/ChoiceOfDatePage'
import { PageServiceMenu } from '../../ContainerContent/PageService/PageServiceMenu'
import { PayPage } from '../../page/PayPage'
import { CommentsPage } from '../../page/CommentsPage'
import { GetBusinessmenUserAsync } from '../../../store/businessman/action'
import styles from './pageservice.css'
import { InfoServicesPage } from '../../page/InfoServicesPage'

interface IPageService {
  nameSpecialist?: string
}

export type TListServices = {
  id: number
  description: string
  price: string
  title: string
  checked?: boolean
}

export function ServiceRoutes ({ nameSpecialist = 'Мастер маникюра Иванова Катя' }: IPageService) {
  const businessmen = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)
  const { id } = useParams<{ id?: string }>()
  const { path, url } = useRouteMatch()
  const location = useLocation().pathname

  const [pageServices, setPageServices] = useState('info')
  const [titlePage, setTitlePage] = useState(nameSpecialist)
  // const listServices = useSelector<RootState, TDataServices>((state) => state.servicesData.data)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!id) return
    dispatch(GetBusinessmenUserAsync(id))
  }, [id])

  const handleClickNext = () => {
    setPageServices('ChoiceOfDate')
    setTitlePage('Выберите дату и время')
  }

  return (
    <div className={styles.container}>
      <Loading loading={ businessmen.myBusinessmen.loading }/>
      <Switch>
        <Route path={`${url}/buyCart/payment`}>
          <div className={styles.subContainer}>
            <PayPage addressBack={`${url}/buyCart`} />
          </div>
        </Route>
        <Route path={`${url}/buyCart`}>
          <PageShoppingCardServices id={id || ''} />
        </Route>
        <Route path={'/pageService/:id/comments'}>
          <CommentsPage />
        </Route>
        <Route path={'/pageService/:id'}>
          {pageServices === 'info' && 
            <InfoServicesPage />
          }
          {pageServices === 'ChoiceOfServices' && (
            <ChoiceOfServices 
              id={id || ''} 
              handleClickNext={handleClickNext} 
              listServices={businessmen.myBusinessmen.data.service} 
            />
          )}
          {pageServices === 'ChoiceOfDate' && (
            <ChoiceOfDatePage
              clickBack={() => {
                setPageServices('ChoiceOfServices')
              }}
            />
          )}
          <PageServiceMenu
            activeBtn={pageServices}
            handleClickOnInfo={() => {
              setPageServices('info')
              setTitlePage(nameSpecialist)
            }}
            handleClickOnCalendar={() => {
              setPageServices('ChoiceOfServices')
              setTitlePage('Запись к мастеру')
            }}
            handleClickOnChat={() => {
              // setPageServices('chat')
              // setTitlePage('Чат')
            }}
          />
        </Route>
      </Switch>
    </div>
  )
}
