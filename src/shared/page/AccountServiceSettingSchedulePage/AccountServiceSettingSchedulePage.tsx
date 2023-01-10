import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Calendar } from '../../components/Calendar';
import { MenuContainer } from '../../components/MenuContainer';
import { MiniMap } from '../../components/MiniMap';
import { Title } from '../../components/Title';
import { ButtonBack } from '../../components/Buttons/ButtonBack';
import { ButtonNextPage } from '../../components/Buttons/ButtonNextPage';
import { EColor, Text } from '../../components/Text';
import { ListInterval } from './components/ListInterval';
import { DualCheckbox } from '../../components/Inputs/DualCheckbox';
import styles from './servicesettingschedulepage.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { TBusinessmenState } from '../../../store/businessman/reducer';

const listValueLocationDefault = [
  {
    value: 'me',
    textLabel: 'У себя',
    checked: false,
  },
  {
    value: 'client',
    textLabel: 'С выездом',
    checked: false,
  },
]

export function AccountServiceSettingSchedulePage() {
  const { id } = useParams<{ id?: string; }>()
  const { myBusinessmen } = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)
  const [listValueLocation, setListValueLocation] = useState(listValueLocationDefault)
  const [valuePrice, setValuePrice] = useState('')
  const [pickData, setPickData] = useState([])
  const [page, setPage] = useState('')

  function changeValueLocation (position: number) {
    const newListValue = listValueLocation.map((elem, index) =>
      position === index ? { value: elem.value, textLabel: elem.textLabel, checked: !elem.checked } : elem,
    )

    setListValueLocation(newListValue)
  }

  const clickOndate = (e: any) => {
    console.log(e)
    setPage('lisInterval')
  }


  if(String(myBusinessmen.data.id) !== id) {
    return (
      <Redirect to="/account/myQuestionnaires/"/>
    )
  }

  return (
    <MenuContainer isMaxHeight>
      <ButtonBack addressLink={`/menu/account/business/myQuestionnaires/service/${id}`} />
      <Title text='Настройка расписания' />
      <Text As='h3' className={styles.subTitle} size={16} color={EColor.greenDark}>Выберите рабочие дни</Text>
      <Calendar handleClick={clickOndate}/>
      <Text As='h3' className={styles.subTitleSecond} size={16} color={EColor.greenDark}>Место оказания услуги</Text>
      <DualCheckbox classNameForm={styles.checkbox} listCheckbox={listValueLocation} changeValue={changeValueLocation} />
      {listValueLocation[1].checked && (
        <>
          <form>
            <div className={styles.inputContainer}>
              <label htmlFor={'delivery-label'}>Стоимость выезда (за 50 м пути)</label>
              <input placeholder='000 тнг'  id={'delivery-input'} value={valuePrice} onChange={(e) => setValuePrice(e.target.value)} />
            </div>
          </form>
          <Text As='h3' className={styles.subTitleThird} size={16} color={EColor.greenDark}>Радиус выезда</Text>
          <MiniMap />
        </>
      )}
      {page === 'lisInterval' && (
        <ListInterval />
      )}
      <ButtonNextPage
        text='Сохранить'
        onClick={() => {}}
        classNameButton={styles.button}
      />
    </MenuContainer>
  );
}
