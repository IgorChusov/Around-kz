import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Route, Switch, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'

import { PageServiceMenu } from '../PageService/PageServiceMenu'

import { PagePay } from '../PagePay'

import { getProducts } from '../../../store/products/action'

import { RootState } from '../../../store/reducer'

import { TDataProducts } from '../../../store/products/reduces'

import { PageComments } from '../PageComments'

import { PageAllProduct } from './PageAllProduct'
import { PageDetalProductBringing } from './PageDetalProductBringing'
import { PageProductReserveBringing } from './PageProductReserveBringing'
import { PageProductChat } from './PageProductChat'
import { PageDetalProductStore } from './PageDetalProductStore'

import styles from './pageproduct.css'

import { PageProductListShopping } from './PageProductListShopping'
import { PageProductReserveStore } from './PageProductReserveStore'

export function PageProduct () {
  const { id, type } = useParams<{ id?: string; type?: string }>()
  const { path, url } = useRouteMatch()
  // const [amountReserveProduct, setAmountReserveProduct] = useState<{id: string, amount: number}[]>([{id:'', amount: 1}]);
  const [amountReserveProduct, setAmountReserveProduct] = useState(1)
  const [listImg, setListImg] = useState<string[]>()
  const location = useLocation().pathname
  const history = useHistory()
  const data = useSelector<RootState, TDataProducts>((state) => state.productsData.data)
  // временное
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts(id || '', type || ''))
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
            <PagePay addressBack="" />
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
          <PageComments />
        </Route>
        <Route path={'/pageProducts/:type/:id'}>
          <PageAllProduct
            listImg={listImg}
            id={id || ''}
            type={type || ''}
            clickOnProduct={() => {}}
            productList={data}
          />
        </Route>
      </Switch>
      {location !== `/pageProducts/${type}/${id}/comments` && (
        <PageServiceMenu
          activeBtn={activeBtn}
          handleClickOnCalendar={changePageOnReserve}
          handleClickOnChat={changePageOnChat}
          handleClickOnInfo={changePageOnDetailed}
        />
      )}
    </div>
  )
}
