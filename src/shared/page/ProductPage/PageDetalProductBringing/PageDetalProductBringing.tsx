import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { productListShopping, TProductListShopping } from '../../../../store/actionCreator/productShopingList'

import { RootState } from '../../../../store/reducer'
import { ButtonBack } from '../../../components/Buttons/ButtonBack'
import { ButtonCarousel } from '../../../components/Buttons/ButtonCarousel'
import { EColor, Text } from '../../../components/Text'

import styles from './pagedetalproductbringing.css'

interface IPageDetalProductBringing {
  clickOnButtonBack?: () => void
  amount: number
  clickMinus: () => void
  clickPlus: () => void
  listImg?: string[]
}

interface IElement {
  id: string
  nameProduct: string
  price: number
  min: number
  description: string
  img: string
  unit: string
}

export function PageDetalProductBringing (props: IPageDetalProductBringing) {
  // const dispatch = useDispatch()
  // const { id, idProduct } = useParams<{ id?: string; idProduct?: string }>()
  // const data = useSelector<RootState, TDataProducts>((state) => state.productsData.data)
  // const listShopping = useSelector<RootState, TProductListShopping>((state) => state.productListShopping)
  // const [elementProduct, setElementProduct] = useState<IElement>()
  // useEffect(() => {
  //   const [element] = data.list.filter((f) => {
  //     return f.id === idProduct
  //   })
  //   setElementProduct(element)
  // }, [data])
  // const handleClick = () => {
  //   if (!elementProduct) return
  //   const fullPrice = props.amount * elementProduct?.price
  //   const shoppingList = listShopping.list ? listShopping.list : []
  //   const filterShoppingList = shoppingList.filter((elem) => {
  //     return elem.id !== idProduct
  //   })
  //   const newProduct = {
  //     id: elementProduct.id,
  //     nameProduct: elementProduct.nameProduct,
  //     price: elementProduct.price,
  //     amount: props.amount,
  //     unit: elementProduct.unit,
  //   }
  //   dispatch(
  //     productListShopping({ id: id, fullPrice: fullPrice, name: data.name, list: [...filterShoppingList, newProduct] }),
  //   )
  // }
  return (
    <div className={styles.container}>
      {/* <ButtonBack
        handleClick={props.clickOnButtonBack}
        className={styles.buttonBack}
        addressLink={`/pageProducts/bringing/${id}`}
      />
      <Text color={EColor.greenDark} className={styles.title} size={24} As="h2">
        {data.name}
      </Text>
      <Text color={EColor.greenDark} className={styles.description} size={16} As="p">
        {elementProduct?.description}
      </Text>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={elementProduct?.img} />
      </div>
      <div className={styles.containerInfo}>
        <Text className={styles.infoName} As="p" size={16}>
          {elementProduct?.nameProduct}
        </Text>
        <Text As="p" size={16}>
          Завоз 03.03.2022
        </Text>
      </div>
      <div className={styles.containerInfo}>
        <Text As="p" size={16}>{`от ${elementProduct?.min} ${elementProduct?.unit}`}</Text>
        <div className={styles.rightInfo}>
          <ButtonCarousel
            classNameGroup={styles.carousel}
            amount={props.amount}
            onMinus={props.clickMinus}
            onPlus={props.clickPlus}
          />
          <Text As="p" size={16}>{`${elementProduct?.price} тнг/кг`}</Text>
        </div>
      </div>
      <Link to={`/pageProducts/bringing/${id}/buyCart`} onClick={handleClick} className={styles.button}>
        <Text color={EColor.white} size={20}>
          Добавить в корзину
        </Text>
      </Link> */}
    </div>
  )
}
