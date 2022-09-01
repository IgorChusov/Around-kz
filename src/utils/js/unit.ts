import { EMarketUnit } from "../../store/market/reduser"

export const transformUnit = (unit: EMarketUnit | string) => {
  if(unit === EMarketUnit.centimeter) {
    return 'см'
  }
  if(unit === EMarketUnit['cubic meter']) {
    return 'м3'
  }

  if(unit === EMarketUnit.gram) {
    return 'г'
  }

  if(unit === EMarketUnit.kilogram) {
    return 'кг'
  }

  if(unit === EMarketUnit.meter) {
    return 'м'
  }

  if(unit === EMarketUnit.piece) {
    return 'шт'
  }

  if(unit === EMarketUnit['square meter']) {
    return 'м2'
  }

  return 'шт'
}
