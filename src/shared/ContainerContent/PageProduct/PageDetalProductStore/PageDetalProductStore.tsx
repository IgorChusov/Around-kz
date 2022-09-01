import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useRouteMatch } from 'react-router-dom'
import { productListShopping, TProductListShopping } from '../../../../store/actionCreator/productShopingList'
import { TGetBusinessmenState } from '../../../../store/businessman/get/reduser'
import { RootState } from '../../../../store/reducer'
import { ButtonBack } from '../../../universalComponent/ButtonBack'
import { ButtonCarousel } from '../../../universalComponent/ButtonCarousel'
import { Text, EColor } from '../../../universalComponent/Text'
import styles from './pagedetalproductstore.css'

interface IPageDetalProductStore {
  amountProduct: number
  clickOnMinus: () => void
  clickOnPlus: () => void
  listImg?: string[]
}

interface IElement {
  id: number
  description: string
  image: string
  min_quantity: number
  price: string
  quantity: number
  title: string
  unit: string
}

export function PageDetalProductStore (props: IPageDetalProductStore) {
  // const dispatch = useDispatch()
  // const { id, idProduct, type } = useParams<{ id?: string; idProduct?: string; type?: string }>()
  // const listShopping = useSelector<RootState, TProductListShopping>((state) => state.productListShopping)
  // const businessmen = useSelector<RootState, TGetBusinessmenState>((state) => state.businessmen)
  
  // const [elementProduct, setElementProduct] = useState<IElement>()
  // const { path, url } = useRouteMatch()

  // useEffect(() => {
  //   const element = businessmen.data.product.find((f) => String(f.id) === idProduct)
  //   setElementProduct(element)
  // }, [businessmen.data])

  // function handleClick () {
  //   if (!elementProduct) return
  //   const fullPrice = props.amountProduct * Number(elementProduct?.price)
  //   const shoppingList = listShopping.list ? listShopping.list : []
  //   const filterShoppingList = shoppingList.filter((elem) => {
  //     return elem.id !== idProduct
  //   })
  //   const newProduct = {
  //     id: elementProduct.id,
  //     nameProduct: elementProduct.nameProduct,
  //     price: elementProduct.price,
  //     amount: props.amountProduct,
  //     unit: elementProduct.unit,
  //   }
  //   const is = dispatch(
  //     productListShopping({ id: id, fullPrice: fullPrice, name: data.name, list: [...filterShoppingList, newProduct] }),
  //   )
  // }
  return (
    <div className={styles.container}>
      {/* <ButtonBack className={styles.buttonBack} addressLink={`/pageProducts/store/${id}`} />
      <Text color={EColor.greenDark} className={styles.title} size={24} As="h2">
        {data.name}
      </Text>
      <Text color={EColor.greenDark} className={styles.description} size={16} As="p">
        {data.description}
      </Text>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={elementProduct?.img} alt="Фото продукта" />
      </div>

      <Text color={EColor.greenDark} className={styles.cardTitle} As="p" size={16}>
        {elementProduct?.nameProduct}
      </Text>
      <Text color={EColor.greenDark} className={styles.cardDescription} As="p" size={16}>
        {elementProduct?.description}
      </Text>
      <Text
        color={EColor.greenDark}
        className={styles.cardInfo}
        As="p"
        size={12}
      >{`от ${elementProduct?.min}${elementProduct?.unit}, осталось: ${elementProduct?.amountProduct}${elementProduct?.unit}`}</Text>
      <div className={styles.containerInfo}>
        <ButtonCarousel amount={props.amountProduct} onMinus={props.clickOnMinus} onPlus={props.clickOnPlus} />
        <Text color={EColor.greenDark} As="p" size={16}>{`${elementProduct?.price} тнг/кг`}</Text>
      </div>
      <Link onClick={handleClick} to={`/pageProducts/store/${id}/buyCart`} className={styles.button}>
        <Text color={EColor.white} size={20}>
          Забронировать
        </Text>
      </Link> */}
    </div>
  )
}
