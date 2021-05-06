import { useEffect } from 'react'
import useGetPriceData from './useGetPriceData'
import { PSI, INC } from '../constants'

const useGetDocumentTitlePrice = () => {
  const priceData = useGetPriceData()

  const psiPriceUsd = priceData ? parseFloat(priceData.data[PSI].price) : 0
  const incPriceUsd = priceData ? parseFloat(priceData.data[INC].price) : 0

  let priceString =
    Number.isNaN(psiPriceUsd) || psiPriceUsd === 0
      ? ''
      : ` | PSI - $${psiPriceUsd.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`
  priceString =
    Number.isNaN(incPriceUsd) || incPriceUsd === 0
      ? ''
      : ` | PSI - $${incPriceUsd.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`

  useEffect(() => {
    document.title = `PSI Dex${priceString}`
  }, [priceString])
}
export default useGetDocumentTitlePrice
