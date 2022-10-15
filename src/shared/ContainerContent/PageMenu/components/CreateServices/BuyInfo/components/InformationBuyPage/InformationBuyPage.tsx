import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeMarketUserAsync, CreateMarketAsync, DeleteMarketUserAsync } from '../../../../../../../../store/market/action'
import { generateRandomString } from '../../../../../../../../utils/js/generateRandomIndex'
import { ErrorPanel, IErrorPanel } from '../../../../../../../components/ErrorPanel'
import { Input } from '../../../../../../../components/Input'
import { Loading } from '../../../../../../../components/Loading'
import { Text, EColor } from '../../../../../../../components/Text'
import { UniversalSelect } from '../../../../../../../components/UniversalSelect'
import styles from './informationbuypage.css'
import cn from 'classnames'
import { RootState } from '../../../../../../../../store/reducer'
import { TGetBusinessmenState } from '../../../../../../../../store/businessman/get/reduser'
import { useHistory, useParams } from 'react-router'
import { TMarketState } from '../../../../../../../../store/market/reduser'

const listOptionsUnitDefault = [
  { value: 'piece', label: 'шт' },
  { value: 'gram', label: `г` },
  { value: 'kilogram', label: 'кг' },
  { value: 'centimeter', label: 'см' },
  { value: 'meter', label: 'м' },
  { value: 'square meter', label: `м2` },
  { value: 'cubic meter', label: `м3` },
]

const dateErrorBasic = [
  { name: 'name', text: '', valid: true },
  { name: 'price', text: '', valid: true },
  { name: 'description', text: '', valid: true},
  { name: 'quantity', text: '', valid: true},
  { name: 'min', text: '', valid: true},
  { name: 'img', text: '', valid: true},
]

interface IProduct {
  id: number
  description: string
  image: string
  min_quantity: number
  price: string
  quantity: number
  title: string
  unit: string
}

export function InformationBuyPage () {
  const history = useHistory()
  const dispatch = useDispatch()
  const { id, idProduct } = useParams<{ id?: string; idProduct?: string}>()
  const refFile = useRef<HTMLInputElement>(null)
  
  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)
  const [serverErrors, setServerErrors] = useState<IErrorPanel []>([])
 
  const businessmen = useSelector<RootState, TGetBusinessmenState>((state) => state.businessmen)
  const market = useSelector<RootState, TMarketState>((state) => state.market)
  const [product, setProduct] = useState<IProduct | null>(null)
  const [isChangeComponent, setIsChangeComponent] = useState(false)

  const [file, setFile] = useState('')
  const [valueInputName, setValueInputName] = useState('')
  const [valueInputPrice, setValueInputPrice] = useState('')
  const [valueTextAreaInfoBuy, setValueTextAreaInfoBuy] = useState('')
  const [valueAvailableQuantity, setValueAvailableQuantity] = useState('')
  const [valueInputMin, setValueInputMin] = useState('')
  const [listOptionsAmount, setListOptionsAmount] = useState(listOptionsUnitDefault)
  const [selected, setSelected] = useState(listOptionsUnitDefault[0])

  function handleChangeValueInputName (e: ChangeEvent<HTMLInputElement>) {
    arrError[0].valid = true
    arrError[0].text = ''
    setArrError(prevState => [...prevState])
    setValueInputName(e.target.value)
  }

  function handleChangeValueInputPrice (e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if(/^\d+$/.test(value) || /^\s*$/.test(value)) {
      arrError[1].valid = true
      arrError[1].text = ''
      setArrError(prevState => [...prevState])
      setValueInputPrice(value)
    }
  }

  function handleChangeValueTextAreaInfoBuy (e: ChangeEvent<HTMLTextAreaElement>) {
    arrError[2].valid = true
    arrError[2].text = ''
    setArrError(prevState => [...prevState])
    setValueTextAreaInfoBuy(e.target.value)
  }

  function handleChangeInputAvailableQuantity (e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if(/^\d+$/.test(value) || /^\s*$/.test(value)) {
      arrError[3].valid = true
      arrError[3].text = ''
      setArrError(prevState => [...prevState])
      setValueAvailableQuantity(e.target.value)
    }
  }

  function handleChangeInputMin (e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if(/^\d+$/.test(value) || /^\s*$/.test(value)) {
      arrError[4].valid = true
      arrError[4].text = ''
      setArrError(prevState => [...prevState])
      setValueInputMin(e.target.value)
    }
  }

  const changeSelect = (e: { value: string; label: string }) => {
    setSelected(e)
  }

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault()

    if(valueInputName.length === 0) {
      arrError[0].text='Заполните поле'
      arrError[0].valid= false
    }

    if(valueInputPrice.length === 0) {
      arrError[1].text='Заполните поле'
      arrError[1].valid= false
    }

    if(valueTextAreaInfoBuy.length === 0) {
      arrError[2].text='Заполните поле'
      arrError[2].valid= false
    }

    if(valueAvailableQuantity.length === 0) {
      arrError[3].text='Заполните поле'
      arrError[3].valid= false
    }

    if(valueInputMin.length === 0) {
      arrError[4].text='Заполните поле'
      arrError[4].valid= false
    }
  
    if(!refFile?.current?.files?.[0] && !product?.image) {
      console.log(refFile?.current?.files?.[0])
      arrError[5].text='Пожалуйста, добавьте минимум одно фото'
      arrError[5].valid= false
    }
 
    const newArrError = arrError.concat()

    setArrError(newArrError)

    if (newArrError.find((elem) => !elem.valid)) return

    const formData = new FormData()

    formData.append('title', valueInputName)
    formData.append('description', valueTextAreaInfoBuy)
    formData.append('price',  valueInputPrice)
    formData.append('unit',  selected.value)
    formData.append('quantity',  valueAvailableQuantity)
    formData.append('seller',  String(businessmen.data.id))

    if(refFile.current && refFile.current.files?.[0]) {
      formData.append('image', refFile.current.files[0]);
    } 

    if(product && idProduct) {
      const resp = await dispatch(ChangeMarketUserAsync(formData, idProduct))
      if(!!resp) {
        history.push(`/menu/account/business/myQuestionnaires/products/${id}/changeInfo/listProduct`)
      }
    } else {
      const resp = await dispatch(CreateMarketAsync(formData))
      if(!!resp) {
        history.push(`/menu/account/business/myQuestionnaires/products/${id}/changeInfo/listProduct`)
      }
    }
  }

  const onDelete = async () => {
    if(!idProduct) return
    const resp = await dispatch(DeleteMarketUserAsync(idProduct))
    // @ts-ignore
    if(resp?.status === 204) {
      history.push(`/menu/account/business/myQuestionnaires/products/${id}/changeInfo/listProduct`)
    }
  }

  useEffect(() => {
    const product = businessmen.data.product.find((elem) => String(elem.id) === idProduct)

    if(!idProduct || !product || isChangeComponent) return
    setValueInputName(product.title)
    setValueInputPrice(product.price)
    setValueTextAreaInfoBuy(product.description)
    setValueInputMin(String(product.min_quantity))
    setValueAvailableQuantity(String(product.quantity))
    setProduct(product)
    setIsChangeComponent(true)
  }, [idProduct, businessmen.data.product])

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
      <form onSubmit={handleSubmitForm} className={styles.form} action="">
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <Input 
              value={valueInputName}
              onChange={handleChangeValueInputName} 
              placeholder={''}
              labelText='Название товара'
              idInput={generateRandomString()}
              error={arrError[0].text}
            />
          </div>
          <div className={styles.inputChangeContainer}>
            <Input 
              value={valueInputPrice}
              onChange={handleChangeValueInputPrice} 
              placeholder={''}
              labelText='Стоимость'
              idInput={generateRandomString()}
              error={arrError[1].text}
              classNameContainer={styles.inputPriceContainer}
              classNameInput={styles.inputPrice}
            />
            <UniversalSelect
              listOptions={listOptionsAmount}
              onChangeOption={changeSelect}
              selectedValue={selected}
              className=''
            />
          </div>
        </div>
        <Text color={EColor.greenDark} className={styles.textInfo} As="h3" size={16}>
          Описание вашего товара
        </Text>
        <div className={styles.textareaContainer}>
          <textarea
            onChange={handleChangeValueTextAreaInfoBuy}
            value={valueTextAreaInfoBuy}
            id={'textareaInfoService'}
            className={cn(styles.textarea, {
              [styles.errorBorder]: !arrError[2].valid
            })}
            placeholder="Описание товара, его качества, свойства и тд."
          ></textarea>
          <label className={styles.labelTag} htmlFor="textareaInfoService">
            Не более 500 знаков
          </label>
          <span className={styles.error}>{arrError[2].text}</span>
        </div>
        <Text color={EColor.greenDark} className={styles.textInfo} As="h3" size={16}>
          Количество в наличии
        </Text>
        <div className={styles.inputCenterGroup}>
          <input
            value={valueAvailableQuantity}
            onChange={handleChangeInputAvailableQuantity}
            className={cn(styles.inputGroupInput, {
              [styles.errorBorder]:  !arrError[3].valid
            })}
            type="text"
            placeholder='Кол-во'
          />
          <UniversalSelect
              listOptions={listOptionsAmount}
              onChangeOption={changeSelect}
              selectedValue={selected}
              className=''
            />
        </div>
        <Text color={EColor.greenDark} className={styles.textInfo} As="h3" size={16}>
          Установите минимальный размер заказа
        </Text>
        <div className={styles.inputCenterGroup}>
          <input
            value={valueInputMin}
            onChange={handleChangeInputMin}
            className={cn(styles.inputGroupInput, {
              [styles.errorBorder]:  !arrError[4].valid
            })}
            type="text"
            placeholder='Кол-во'
          />
          <UniversalSelect
            listOptions={listOptionsAmount}
            onChangeOption={changeSelect}
            selectedValue={selected}
            className=''
          />
        </div>
        <div className={styles.inputFileContainer}>
          <input 
            ref={refFile}
            className={cn(styles.inputFile, {
              [styles.errorBorder]:  !arrError[5].valid
            })} 
            name="file" id={'inputFile'} 
            accept="image/*" 
            type="file" 
            onChange={() => { 
              if(refFile?.current?.files && refFile.current.files[0]) {
                setFile(refFile.current.files[0].name)
                arrError[5].valid = true
                arrError[5].text = ''
                setArrError(prevState => [...prevState])
              }
            }}
          />
          <label className={cn(styles.inputFileBtn, {
             [styles.errorBorder]:  !arrError[5].valid
          })} htmlFor="inputFile">
            <span>Загрузить фото</span>
          </label>
          <label className={styles.labelTag} htmlFor="inputFile">
            {file.length > 0 ? file : product?.image}
          </label>
        </div>
        <button className={styles.btnNextPage}>
          Сохранить
        </button>
      </form>
      {idProduct && (
        <button 
          className={styles.deleteBtn}
          onClick={() => onDelete()}
        >
          Удалить товар
        </button>
      )}
      <Loading loading={market.loading} />
      {serverErrors.length > 0 && 
        <ErrorPanel list={serverErrors} />
      }
    </div>
  )
}
