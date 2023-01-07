import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { RootState } from '../../../store/reducer'
import { PageProductReserveBringing } from '../../page/ProductPage/PageProductReserveBringing'
import { PageProductReserveStore } from '../../page/ProductPage/PageProductReserveStore'
import { PageProductListShopping } from '../../page/ProductPage/PageProductListShopping'
import { PageDetalProductBringing } from '../../page/ProductPage/PageDetalProductBringing'
import { PageDetalProductStore } from '../../page/ProductPage/PageDetalProductStore'
import { PageProductChat } from '../../page/ProductPage/PageProductChat'
import { PageAllProduct } from '../../page/ProductPage/PageAllProduct'
// import { PageServiceMenu } from '../../components/ServiceMenu'
import { PayPage } from '../../page/PayPage'
import { CommentsPage } from '../../page/CommentsPage'
import styles from './pageproduct.css'
import { TBusinessmenState } from '../../../store/businessman/reducer'

export function ProductRoutes () {
  const { id, type } = useParams<{ id?: string; type?: string }>()
  const dispatch = useDispatch()
  const { path, url } = useRouteMatch()
  const location = useLocation().pathname
  const history = useHistory()
  const businessmen = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)

  // const [amountReserveProduct, setAmountReserveProduct] = useState<{id: string, amount: number}[]>([{id:'', amount: 1}]);
  const [amountReserveProduct, setAmountReserveProduct] = useState(1)
  const [listImg, setListImg] = useState<string[]>()

  // const data = useSelector<RootState, TDataProducts>((state) => state.productsData.data)
  // временное
 

  useEffect(() => {
    // dispatch()
  }, [url])

  // info / chat / ChoiceOfDate
  const [activeBtn, setActiveBtn] = useState('')
  // переходы по страницам
  const changePageOnReserve = () => {
    history.push(`/pageProducts/${type}/${id}/buyCart`)
  }
  const clickMinus = () => {
    if (amountReserveProduct <= 0) return
    const newAmount = amountReserveProduct - 1
    setAmountReserveProduct(newAmount)
  }
  const clickPlus = () => {
    const newAmount = amountReserveProduct + 1
    setAmountReserveProduct(newAmount)
  }
  const changePageOnChat = () => {
    history.push(`/pageProducts/${type}/${id}/chat`)
  }
  const changePageOnDetailed = () => {
    history.push(`/pageProducts/${type}/${id}/product`)
  }
  useEffect(() => {
    if (location === `/pageProducts/${type}/${id}/chat`) {
      setActiveBtn('chat')
    } else if (
      location === `/pageProducts/${type}/${id}/reserve` ||
      location === `/pageProducts/${type}/${id}/buyCart`
    ) {
      setActiveBtn('ChoiceOfDate')
    } else {
      setActiveBtn('info')
    }
  }, [location])

  return (
    <div className={styles.container}>
      <Switch>
        <Route path={'/pageProducts/:type/:id/payment'}>
          <div className={styles.subContainer}>
            <PayPage addressBack="" />
          </div>
        </Route>
        <Route path={'/pageProducts/bringing/:id/reserve/'}>
          <PageProductReserveBringing />
        </Route>
        <Route path={'/pageProducts/store/:id/reserve/'}>
          <PageProductReserveStore />
        </Route>
        <Route path={'/pageProducts/:type/:id/buyCart'}>
          <PageProductListShopping clickButtonBack={() => {}} />
        </Route>
        <Route path={'/pageProducts/bringing/:id/product/:idProduct'}>
          <PageDetalProductBringing
            listImg={listImg}
            clickMinus={clickMinus}
            clickPlus={clickPlus}
            amount={amountReserveProduct}
          />
        </Route>
        <Route path={'/pageProducts/store/:id/product/:idProduct'}>
          <PageDetalProductStore
            listImg={listImg}
            amountProduct={amountReserveProduct}
            clickOnMinus={clickMinus}
            clickOnPlus={clickPlus}
          />
        </Route>
        <Route path={'/pageProducts/:type/:id/chat'}>
          <PageProductChat />
        </Route>
        <Route path={'/pageProducts/:type/:id/comments'}>
          <CommentsPage />
        </Route>
        <Route path={'/pageProducts/:type/:id'}>
          <PageAllProduct
            listImg={listImg}
            id={id || ''}
            type={type || ''}
            clickOnProduct={() => {}}
          />
        </Route>
      </Switch>
      {/* {location !== `/pageProducts/${type}/${id}/comments` && (
        // <PageServiceMenu
        //   activeBtn={activeBtn}
        //   handleClickOnCalendar={changePageOnReserve}
        //   handleClickOnChat={changePageOnChat}
        //   handleClickOnInfo={changePageOnDetailed}
        // />
      )} */}
    </div>
  )
}
