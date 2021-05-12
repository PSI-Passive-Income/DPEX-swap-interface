import { useEffect, useState } from 'react'

type ApiResponse = {
  updated_at: string
  data: {
    [key: string]: {
      name: string
      symbol: string
      price: string
      price_BNB: string
    }
  }
}

const api = 'https://psidex.passive-income.io/api/tokens'
const apiPCS = 'https://api.pancakeswap.info/api/tokens'

const useGetPriceData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        if (response.ok) {
          const res: ApiResponse = await response.json()
          setData(res)
        } else {
          const responsePCS = await fetch(apiPCS)
          const resPCS: ApiResponse = await responsePCS.json()
          setData(resPCS)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)

        try {
          const responsePCS = await fetch(apiPCS)
          const resPCS: ApiResponse = await responsePCS.json()

          setData(resPCS)
        } catch (errorPCS) {
          console.error('Unable to fetch price data PCS:', errorPCS)
        }
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetPriceData
