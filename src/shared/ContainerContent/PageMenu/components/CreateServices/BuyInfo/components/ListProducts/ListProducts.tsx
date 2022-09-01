import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { TGetBusinessmenState } from '../../../../../../../../store/businessman/get/reduser'
import { RootState } from '../../../../../../../../store/reducer'
import { transformUnit } from '../../../../../../../../utils/js/unit'
import { IconElementPlus } from '../../../../../../../Icons'
import { EColor, Text } from '../../../../../../../universalComponent/Text'
import styles from './listproducts.css'

export function ListProducts () {
  const history = useHistory()
  const { id } = useParams<{ id?: string;}>()
  const businessmen = useSelector<RootState, TGetBusinessmenState>((state) => state.businessmen)
  
  return (
    <div className={styles.container}>
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        {'Добавьте новый товар'}
      </Text>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.containerPlus}>
            <IconElementPlus />
            <IconElementPlus />
          </div>
          <Link className={styles.link} to={`/menu/account/business/myQuestionnaires/products/${id}/changeInfo/components`}></Link>
        </li>
        {businessmen.data.product.map((elem) => (
          <li 
            key={`${elem.id}`} 
            className={styles.item}
            onClick={() => history.push(`/menu/account/business/myQuestionnaires/products/${id}/changeInfo/components/${elem.id}`)}
          >
            <div className={styles.containerImg}>
              <img src={elem.image} alt={elem.title} />
            </div>
            <div className={styles.content}>
              <Text As="h3" className={styles.titleCard} size={16}>
                {elem.title}
              </Text>
              <Text className={styles.text} size={16}>
                {`От ${elem.min_quantity} ${transformUnit(elem.unit)}`}
              </Text>
              <Text className={styles.textPrice} size={16}>
                {`${elem.price} тнг/${transformUnit(elem.unit)}`}
              </Text>
            </div>
          </li>
        ))}
      </ul>
      <Link className={styles.button} to={`/menu/account/business/myQuestionnaires/products/${id}`}>
        <Text color={EColor.white} size={20}>
          Сохранить
        </Text>
      </Link>
    </div>
  )
}
