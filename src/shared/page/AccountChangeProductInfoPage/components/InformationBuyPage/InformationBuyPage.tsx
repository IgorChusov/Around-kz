import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateMarketAsync } from '../../../../../store/market/action'
import { ErrorPanel, IErrorPanel } from '../../../../components/ErrorPanel'
import { Loading } from '../../../../components/Loading'
import { Text } from '../../../../components/Text'
import { RootState } from '../../../../../store/reducer'
import { useHistory, useParams } from 'react-router'
import { TMarketState } from '../../../../../store/market/reduser'
import { TBusinessmenState } from '../../../../../store/businessman/reducer'
import { DetailedProductForm, IReturnDetailedProductForm } from '../../../../components/Forms/DetailedProductForm'
import { ButtonNextPage } from '../../../../components/Buttons/ButtonNextPage'
import { CountdownHandle } from '../../../../components/Forms/types'
import styles from './informationbuypage.css'

export function InformationBuyPage () {
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams<{ id?: string;}>()
  const formRef = useRef<CountdownHandle | null>(null);
  const [serverErrors, setServerErrors] = useState<IErrorPanel []>([])
 
  const { myBusinessmen } = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)
  const market = useSelector<RootState, TMarketState>((state) => state.market)

  const handleSubmitForm = async (data: IReturnDetailedProductForm) => {
    const formData = new FormData()
    
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('price',  data.price)
    formData.append('unit',  data.unit)
    formData.append('available_quantity',  data.available_quantity)
    formData.append('min_quantity',  data.min_quantity)
    formData.append('seller',  String(myBusinessmen.data.id))
    if(data.image) {
      formData.append('image', data.image);
    }

    const resp = await dispatch(CreateMarketAsync(formData))
    if(!!resp) {
      history.push(`/account/myQuestionnaires/products/${id}/changeInfo/listProduct`)
    }
  }

  const handleClickSubmit = () => {
    if(formRef.current) {
      formRef.current.handleSubmitForm()
    }
  }

  useEffect(() => {
    if(market.error.length > 0) {
      setServerErrors([{name: 'server', text: market.error, valid: false }])
    }else {
      setServerErrors([])
    }
  }, [market.error])

  return (
    <div className={styles.container}>
      <Text className={styles.title} As="h2" size={24}>
        Добавьте новый товар
      </Text>
      <DetailedProductForm ref={formRef} onSubmit={handleSubmitForm}/>
      <ButtonNextPage onClick={handleClickSubmit} text='Сохранить'/>
      <Loading loading={market.loading} />
      {serverErrors.length > 0 && 
        <ErrorPanel list={serverErrors} />
      }
    </div>
  )
}
