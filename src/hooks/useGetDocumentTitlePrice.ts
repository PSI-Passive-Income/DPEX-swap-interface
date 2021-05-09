import { useEffect } from 'react'
import useGetPriceData from './useGetPriceData'
import { PSI, INC } from '../constants'

const useGetDocumentTitlePrice = () => {
  const priceData = useGetPriceData()

  const psiPriceUsd = priceData && priceData.data && priceData.data[PSI] ? parseFloat(priceData.data[PSI].price) : 0
  const incPriceUsd = priceData && priceData.data && priceData.data[INC] ? parseFloat(priceData.data[INC].price) : 0

  let priceString =
    Number.isNaN(psiPriceUsd) || psiPriceUsd === 0
      ? ''
      : ` | PSI - $${psiPriceUsd.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`
  priceString +=
    Number.isNaN(incPriceUsd) || incPriceUsd === 0
      ? ''
      : ` | INC - $${incPriceUsd.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`

  useEffect(() => {
    document.title = `PSI Dex${priceString}`
  }, [priceString])
}
export default useGetDocumentTitlePrice
