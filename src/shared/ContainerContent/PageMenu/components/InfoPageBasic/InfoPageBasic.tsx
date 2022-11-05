import React, { ChangeEvent, FormEvent, RefObject, useEffect, useRef } from 'react'
import { IconElementPlus } from '../../../../Icons'
import { IErrorPanel } from '../../../../components/ErrorPanel'
import { Input } from '../../../../components/Input'
import { EColor, Text } from '../../../../components/Text'
import styles from './infopagebasic.css'
import cn from 'classnames'

interface IInfoPageBasic {
  type: 'Service' | 'Product'
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  valueActivity: string
  setValueActivity: (e: ChangeEvent<HTMLInputElement>) => void
  valueAddress: string
  setValueAddress: (e: ChangeEvent<HTMLInputElement>) => void
  valueDescription: string
  setValueDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void
  valueTags: string
  setValueTags: (e: ChangeEvent<HTMLInputElement>) => void
  arrError: IErrorPanel[]
  refFile1?: RefObject<HTMLInputElement>
  refFile2?: RefObject<HTMLInputElement>
  refFile3?: RefObject<HTMLInputElement>
  refFile4?: RefObject<HTMLInputElement>
  refFile5?: RefObject<HTMLInputElement>
  defaultPhoto1?: string
  defaultPhoto2?: string
  defaultPhoto3?: string
  defaultPhoto4?: string
  defaultPhoto5?: string
}

export function InfoPageBasic (
  { 
    type,
    handleSubmit,
    valueActivity,
    setValueActivity,
    valueAddress,
    setValueAddress,
    valueTags,
    setValueTags,
    valueDescription,
    setValueDescription,
    arrError,
    refFile1,
    refFile2,
    refFile3,
    refFile4,
    refFile5,
    defaultPhoto1,
    defaultPhoto2,
    defaultPhoto3,
    defaultPhoto4,
    defaultPhoto5,
  }: IInfoPageBasic) {
    const refImg1 = useRef<HTMLImageElement>(null)
    const refImg2 = useRef<HTMLImageElement>(null)
    const refImg3 = useRef<HTMLImageElement>(null)
    const refImg4 = useRef<HTMLImageElement>(null)
    const refImg5 = useRef<HTMLImageElement>(null)

    const viewImg = (refFile: RefObject<HTMLInputElement>, refImg: RefObject<HTMLImageElement>) => {
    if (refFile?.current?.files && refFile.current.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        if(!e.target?.result) return
        // @ts-ignore:next-line
        refImg?.current?.setAttribute('src', e.target.result)
      };

      if(refFile.current.files[0] && refImg.current) {
        reader.readAsDataURL(refFile.current.files[0]);

        refImg.current.style.opacity = '1'
      }
    }
  }

  useEffect(()=> {
    if(defaultPhoto1 && refImg1.current) {
      refImg1.current.style.opacity = '1'
    }
    if(defaultPhoto2 && refImg2.current) {
      refImg2.current.style.opacity = '1'
    }
    if(defaultPhoto3 && refImg3.current) {
      refImg3.current.style.opacity = '1'
    }
    if(defaultPhoto4 && refImg4.current) {
      refImg4.current.style.opacity = '1'
    }
    if(defaultPhoto5 && refImg5.current) {
      refImg5.current.style.opacity = '1'
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <Input 
          value={valueActivity}
          onChange={(e) => setValueActivity(e)}
          placeholder=''
          labelText='Вид деятельности'
          classNameContainer={styles.inputContainer}
          error={arrError[0].valid ? undefined : arrError[0].text}
        />
        <Input 
          value={valueAddress}
          onChange={(e) => {setValueAddress(e)}}
          placeholder=''
          labelText='Адрес'
          classNameContainer={styles.inputContainer}
          error={arrError[1].valid ? undefined : arrError[1].text}
        />
      </div>
      <Text As="p" className={styles.textInfo} color={EColor.greenDark} size={16}>
        По каким словам вас смогут найти в поиске?
      </Text>
      <div className={styles.inputTagContainer}>
        <input
          value={valueTags}
          onChange={(e) => setValueTags(e)}
          placeholder="#тег"
          id={'inputTag'}
          className={cn(styles.inputTag, {
            [styles.errorTags]: !arrError[2].valid
          })}
          type="text"
        />
        <label className={styles.labelTag} htmlFor="inputTag">
          Теги разделяйте запятой
        </label>
        {!arrError[2].valid && (
          <span className={styles.error}>
            { arrError[2].text}
          </span>
        )}
      </div>
      <Text color={EColor.greenDark} className={styles.textInfo} As="p" size={16}>
        Описание вашей анкеты
      </Text>
      <div className={styles.textareaContainer}>
        <textarea
          value={valueDescription}
          onChange={(e) => setValueDescription(e)}
          id={'textareaInfoService'}
          className={styles.textarea}
          placeholder="Опыт, особенности услуг и тд."
        />
        <label className={styles.labelTag} htmlFor="textareaInfoService">
          Не более 500 знаков
        </label>
      </div>
     
      {(type === 'Service' && refFile1 && refFile2 && refFile3 && refFile4 && refFile5) && (
        <>
          <Text color={EColor.greenDark} className={styles.textPhoto} size={16} As='p'>Загрузить фото</Text>
          <div className={styles.inputFileContainer}>
            <input 
              ref={refFile1} 
              className={styles.inputFile} 
              name="file" id={'inputFile'} 
              accept="image/*" 
              type="file" 
              onChange={() => viewImg(refFile1, refImg1)}
            />
            <label className={styles.inputFileBtn} htmlFor="inputFile">
              <img className={styles.img} src={defaultPhoto1} ref={refImg1} />
              <IconElementPlus classNameSvg={styles.minus} />
              <IconElementPlus classNameSvg={styles.plus} />
            </label>
            <div className={styles.inputFileGroup}>
              <div className={styles.inputSmallContent}>
                <input 
                  ref={refFile2} 
                  className={styles.inputFile} 
                  name="file" id={'inputFile2'} 
                  accept="image/*" 
                  type="file" 
                  onChange={() => viewImg(refFile2, refImg2)}
                />
                <label className={styles.inputFileBtnSmall} htmlFor="inputFile2">
                  <img className={styles.img} src={ defaultPhoto2}  ref={refImg2} />
                  <IconElementPlus classNameSvg={styles.minusSmall} />
                  <IconElementPlus classNameSvg={styles.plusSmall} />
                </label>
              </div>
              <div className={styles.inputSmallContent}>
                <input 
                  ref={refFile3}
                  className={styles.inputFile} 
                  name="file" id={'inputFile3'} 
                  accept="image/*"
                  type="file" 
                  onChange={() => viewImg(refFile3, refImg3)}
                />
                <label className={styles.inputFileBtnSmall} htmlFor="inputFile3">
                  <img className={styles.img} src={defaultPhoto3}  ref={refImg3} />
                  <IconElementPlus classNameSvg={styles.minusSmall} />
                  <IconElementPlus classNameSvg={styles.plusSmall} />
                </label>
              </div>
              <div className={styles.inputSmallContent}>
                <input 
                  ref={refFile4}
                  className={styles.inputFile} 
                  name="file" 
                  id={'inputFile4'} 
                  accept="image/*" 
                  type="file" 
                  onChange={() => viewImg(refFile4, refImg4)}
                />
                <label className={styles.inputFileBtnSmall} htmlFor="inputFile4">
                  <img className={styles.img} src={defaultPhoto4}  ref={refImg4} />
                  <IconElementPlus classNameSvg={styles.minusSmall} />
                  <IconElementPlus classNameSvg={styles.plusSmall} />
                </label>
              </div>
              <div className={styles.inputSmallContent}>
                <input 
                  ref={refFile5} 
                  className={styles.inputFile} 
                  name="file" 
                  id={'inputFile5'} 
                  accept="image/*" 
                  type="file" 
                  onChange={() => viewImg(refFile5, refImg5)}
                />
                <label className={styles.inputFileBtnSmall} htmlFor="inputFile5">
                  <img className={styles.img} src={defaultPhoto5} ref={refImg5} />
                  <IconElementPlus classNameSvg={styles.minusSmall} />
                  <IconElementPlus classNameSvg={styles.plusSmall} />
                </label>
              </div>
            </div>
          </div>
        </>
      )}
      <button className={styles.btnNextPage}>
        Далее
      </button>
    </form>
  )
}
