import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router-dom'

import { RootState } from '../../../store/reducer'
import { getService } from '../../../store/services/action'
import { TDataServices } from '../../../store/services/reducer'

import img1 from '../../../assets/images/1.jpg'

import img2 from '../../../assets/images/2.jpg'

import img3 from '../../../assets/images/3.jpg'

import { PagePay } from '../PagePay'

import { PageComments } from '../PageComments'

import { ChoiceOfDate } from './ChoiceOfDate'
import { ChoiceOfServices } from './ChoiceOfServices'
import { InfoServices } from './InfoServices'
import styles from './pageservice.css'
import { PageServiceMenu } from './PageServiceMenu'
import { PageShoppingCardServices } from './PageShoppingCardServices'
import { GetBusinessmenUserAsync } from '../../../store/businessman/get/action'
import { TGetBusinessmenState } from '../../../store/businessman/get/reduser'
import { Loading } from '../../universalComponent/Loading'

interface IPageService {
  nameSpecialist?: string
}

export type TListServices = {
  idService: string
  list: { id: string; nameService: string; price: number; checked: boolean }[]
}
// const list ={images:['https://cdn.dribbble.com/users/1090926/screenshots/17266022/media/9a8d3e163cc15d5f2bef1ca2933a944d.png?compress=1&resize=800x600&vertical=top',
// 'https://cdn.dribbble.com/users/1090926/screenshots/17266022/media/9a8d3e163cc15d5f2bef1ca2933a944d.png?compress=1&resize=800x600&vertical=top']}
const list = { images: [img1, img2, img3] }

export function PageService ({ nameSpecialist = 'Мастер маникюра Иванова Катя' }: IPageService) {
  const businessmen = useSelector<RootState, TGetBusinessmenState>((state) => state.businessmen)
  const { id } = useParams<{ id?: string }>()
  const { path, url } = useRouteMatch()
  const location = useLocation().pathname

  const [listImages, setListImages] = useState(list.images)
  const [pageServices, setPageServices] = useState('info')
  const [titlePage, setTitlePage] = useState(nameSpecialist)
  // const listServices = useSelector<RootState, TDataServices>((state) => state.servicesData.data)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!id || String(businessmen.data.id) === id) return
    dispatch(GetBusinessmenUserAsync(id))
  }, [id])

  const handleClickNext = () => {
    setPageServices('ChoiceOfDate')
    setTitlePage('Выберите дату и время')
  }

  return (
    <div className={styles.container}>
      <Loading loading={ businessmen.loading }/>
      <Switch>
        <Route path={`${url}/buyCart/payment`}>
          <div className={styles.subContainer}>
            <PagePay addressBack={`${url}/buyCart`} />
          </div>
        </Route>
        <Route path={`${url}/buyCart`}>
          <PageShoppingCardServices id={id || ''} />
        </Route>
        <Route path={'/pageService/:id/comments'}>
          <PageComments />
        </Route>
        <Route path={'/pageService/:id'}>
          {pageServices === 'info' && 
            <InfoServices businessmen={businessmen.data} />
          }
          {/* {pageServices === 'ChoiceOfServices' && (
            // <ChoiceOfServices 
            //   id={id || ''} 
            //   handleClickNext={handleClickNext} 
            //   listServices={listServices} 
            // />
          )} */}
          {pageServices === 'ChoiceOfDate' && (
            <ChoiceOfDate
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
              setPageServices('chat')
              setTitlePage('Чат')
            }}
          />
        </Route>
      </Switch>
    </div>
  )
}
