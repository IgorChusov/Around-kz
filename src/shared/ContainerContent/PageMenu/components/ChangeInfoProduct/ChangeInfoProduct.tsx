import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router'
import { ChangeBusinessmenUserAsync } from '../../../../../store/businessman/create/action'
import { CreateBusinessmenState } from '../../../../../store/businessman/create/reduser'
import { TGetBusinessmenState } from '../../../../../store/businessman/get/reduser'
import { RootState } from '../../../../../store/reducer'
import { ButtonBack } from '../../../../universalComponent/ButtonBack'
import { IErrorPanel } from '../../../../universalComponent/ErrorPanel'
import { Loading } from '../../../../universalComponent/Loading'
import { EColor, Text } from '../../../../universalComponent/Text'
import { ListProducts } from '../CreateServices/BuyInfo/components/ListProducts'
import { InformationBuyPage } from '../CreateServices/BuyInfo/components/InformationBuyPage'
import { InfoPageBasic } from '../InfoPageBasic'
import styles from './changeinfoproduct.css'

const dateErrorBasic = [
  { name: 'activity', text: '', valid: true },
  { name: 'address', text: '', valid: true },
  { name: 'description', text: '', valid: true},
  { name: 'tags', text: '', valid: true},
  { name: 'photo', text: '', valid: true},
]

export function ChangeInfoProduct () {
  const dispatch = useDispatch()
  const { id, type } = useParams<{ id?: string; type?: string;}>()
  const refPresentation = useRef<HTMLDivElement>(null)
  const location = useLocation().pathname
  const history = useHistory()

  const businessmen = useSelector<RootState, TGetBusinessmenState>((state) => state.businessmen)
  const businessman = useSelector<RootState, CreateBusinessmenState>((state) => state.businessman)
  
  const [title, setTitle] = useState('Заполните информацию о себе')
  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)



  const [valueActivity, setValueActivity] = useState(businessmen.data?.title || '')
  const [valueAddress, setValueAddress] = useState(businessmen.data?.address || '')
  const [valueDescription, setValueDescription] = useState(businessmen.data?.description || '')
  const [valueTags, setValueTags] = useState(businessmen.data?.tags.join() || '')

  const changeValueActivity = (e: ChangeEvent<HTMLInputElement>) => {
    arrError[0].text=''
    arrError[0].valid=true
    setValueActivity(e.target.value)
  }

  const changeValueAddress = (e: ChangeEvent<HTMLInputElement>) => {
    arrError[1].text=''
    arrError[1].valid=true
    setValueAddress(e.target.value)
  }

  const changeValueTags = (e: ChangeEvent<HTMLInputElement>) => {
    arrError[2].text=''
    arrError[2].valid=true
    setValueTags(e.target.value)
  }

  const changeValueDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    arrError[3].text=''
    arrError[3].valid=true
    setValueDescription(e.target.value)
  }
  // функции измененй состояний полей на второй странице
  function handleSubmitForm (e: FormEvent) {
    e.preventDefault()
    console.log('отправлено')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
  
    const newArr = arrError.concat().map((elem) => {
      elem.valid = true
      return elem
    })
    setArrError(newArr)

    if(valueActivity.length === 0) {
      arrError[0].text='Заполните поле'
      arrError[0].valid= false
    }

    if(valueAddress.length < 12) {
      arrError[1].text='Минимум 12 символов'
      arrError[1].valid= false
    }

    if(valueTags.length === 0) {
      arrError[2].text='Заполните поле'
      arrError[2].valid= false
    }

    if(valueDescription.length === 0) {
      arrError[3].text='Заполните поле'
      arrError[3].valid= false
    }

    const newArrError = arrError.concat()

    setArrError(newArrError)

    if (arrError.find((elem) => !elem.valid)) return

    const formData = new FormData()

    const arrTags = valueTags.split(',').map((elem) => {
      return elem.trim()
    })
  
    for (let i = 0; i < arrTags.length; i++) {
      formData.append('tags', arrTags[i]);
    }

    formData.append('title', valueActivity.trim())
    formData.append('address', valueAddress)
    formData.append('description', valueDescription)
    formData.append('questionnaire_type', 'Product')
 
    const resp = await dispatch(ChangeBusinessmenUserAsync(formData))

    if(!!resp) {
      history.push(`/menu/account/business/myQuestionnaires/product/${id}`)
    }
  }

  useEffect(() => {
    if (location === `/menu/account/business/myQuestionnaires/products/${type}/${id}/changeInfo`) {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(0)'
      }
    } else {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(122%)'
      }
    }
  }, [location])

  useEffect(()=> {
    if(businessmen.data.id === 0) {
      history.push('/menu/account/business/myQuestionnaires/')
    }
  }, [])

  return (
    <div className={styles.container}>
      {(location === `/menu/account/business/myQuestionnaires/products/${type}/${id}/changeInfo` ||
        location === `/menu/account/business/myQuestionnaires/products/${type}/${id}/changeInfo/components`) && (
        <div className={styles.presentation}>
          <div ref={refPresentation} className={styles.presentationChecked}></div>
        </div>
      )}
      <Switch>
        <Route path={'/menu/account/business/myQuestionnaires/products/:id/changeInfo/components/:idProduct'}>
          <ButtonBack
            addressLink={`/menu/account/business/myQuestionnaires/products/${id}/changeInfo/listProduct`}
            className={styles.btn}
          />
          <InformationBuyPage />
        </Route>
        <Route path={'/menu/account/business/myQuestionnaires/products/:id/changeInfo/components'}>
          <ButtonBack
            addressLink={`/menu/account/business/myQuestionnaires/products/${id}/changeInfo/listProduct`}
            className={styles.btn}
          />
          <InformationBuyPage />
        </Route>
        <Route path={'/menu/account/business/myQuestionnaires/products/:id/changeInfo/listProduct'}>
          <ButtonBack
            addressLink={`/menu/account/business/myQuestionnaires/products/${id}`}
            className={styles.btn}
          />
          <ListProducts />
        </Route>
        <Route path={'/menu/account/business/myQuestionnaires/products/:id/changeInfo/'}>
          <ButtonBack
            addressLink={`/menu/account/business/myQuestionnaires/products/${id}`}
            className={styles.btn}
          />
          <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
             Заполните информацию о себе
          </Text>
          <InfoPageBasic 
            type='Product'
            handleSubmit={handleSubmit}
            valueActivity={valueActivity}
            setValueActivity={(e) => changeValueActivity(e)}
            valueAddress={valueAddress}
            setValueAddress={(e) => changeValueAddress(e)}
            valueTags={valueTags}
            setValueTags={(e) => changeValueTags(e)}
            valueDescription={valueDescription}
            setValueDescription={(e) => changeValueDescription(e)}
            arrError={arrError}
          />
        </Route>
      </Switch>
      <Loading loading={businessman.loading} />
    </div>
  )
}
