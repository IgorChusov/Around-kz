import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useHistory, useLocation, useParams } from 'react-router'
import { RootState } from '../../../store/reducer'
import { InformationBuyPage } from './components/InformationBuyPage'
import { ListProducts } from './components/ListProducts'
import { IReturnServiceBasicInfoForm, ServiceBasicInfoForm } from '../../components/Forms/ServiceBasicInfoForm'
import { ButtonBack } from '../../components/Buttons/ButtonBack'
import { Loading } from '../../components/Loading'
import { EColor, Text } from '../../components/Text'
import { ChangeBusinessmenUserAsync } from '../../../store/businessman/action'
import { TBusinessmenState } from '../../../store/businessman/reducer'
import { CountdownHandle } from '../../components/Forms/types'
import { ButtonNextPage } from '../../components/Buttons/ButtonNextPage'
import { ErrorPanel } from '../../components/ErrorPanel'
import { ChangeInformationProductPage } from './components/ChangeInformationProductPage'
import styles from './changeinfoproductpage.css'

export function AccountChangeProductInfoPage () {
  const dispatch = useDispatch()
  const { id, type } = useParams<{ id?: string; type?: string;}>()
  const refPresentation = useRef<HTMLDivElement>(null)
  const location = useLocation().pathname
  const history = useHistory()
  const formRef = useRef<CountdownHandle | null>(null)
  
  const { myBusinessmen } = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)

  const handleSubmit = async (data: IReturnServiceBasicInfoForm) => {

    const formData = new FormData()

    const arrTags = data.tags.split(',').map((elem: any) => {
      return elem.trim()
    })
  
    for (let i = 0; i < arrTags.length; i++) {
      formData.append('tags', arrTags[i]);
    }

    formData.append('title', data.title.trim())
    formData.append('address', data.address.trim())
    formData.append('description', data.description.trim())
    formData.append('questionnaire_type', 'Product')
 
    const resp = await dispatch(ChangeBusinessmenUserAsync(formData))

    if(!!resp) {
      history.push(`/account/myQuestionnaires/product/${id}`)
    }
  }


  const handleClickSubmit = () => {
    if(formRef.current) {
      formRef.current.handleSubmitForm();
    }
  }

  useEffect(() => {
    if (location === `/account/myQuestionnaires/products/${type}/${id}/changeInfo`) {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(0)'
      }
    } else {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(122%)'
      }
    }
  }, [location])

  if (String(myBusinessmen.data.id) !== id) {
    return (
      <Redirect to="/account/myQuestionnaires/"/>
    )
  }

  return (
    <div className={styles.container}>
      {(location === `/account/myQuestionnaires/products/${type}/${id}/changeInfo` ||
        location === `/account/myQuestionnaires/products/${type}/${id}/changeInfo/components`) && (
        <div className={styles.presentation}>
          <div ref={refPresentation} className={styles.presentationChecked}></div>
        </div>
      )}
      <Switch>
        <Route path={'/account/myQuestionnaires/products/:id/changeInfo/components/:idProduct'}>
          <ButtonBack
            addressLink={`/account/myQuestionnaires/products/${id}/changeInfo/listProduct`}
            className={styles.btn}
          />
          <ChangeInformationProductPage />
        </Route>
        <Route path={'/account/myQuestionnaires/products/:id/changeInfo/components'}>
          <ButtonBack
            addressLink={`/account/myQuestionnaires/products/${id}/changeInfo/listProduct`}
            className={styles.btn}
          />
          <InformationBuyPage />
        </Route>
        <Route path={'/account/myQuestionnaires/products/:id/changeInfo/listProduct'}>
          <ButtonBack
            addressLink={`/account/myQuestionnaires/products/${id}`}
            className={styles.btn}
          />
          <ListProducts />
        </Route>
        <Route path={'/account/myQuestionnaires/products/:id/changeInfo/'}>
          <ButtonBack
            addressLink={`/account/myQuestionnaires/products/${id}`}
            className={styles.btn}
          />
          <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
             Заполните информацию о себе
          </Text>
          <ServiceBasicInfoForm 
            type='Product'
            ref={formRef}
            onSubmit={handleSubmit}
          />
          <ButtonNextPage 
            text='Далее'
            classNameButton=''
            onClick={handleClickSubmit}
          />
        </Route>
      </Switch>
      <Loading loading={myBusinessmen.loading} />
      {myBusinessmen.error && 
        <ErrorPanel list={[{name: '', text: myBusinessmen.error, valid: false}]} />
      }
    </div>
  )
}
