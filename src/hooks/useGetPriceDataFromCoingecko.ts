import { useEffect, useState } from 'react'

const coingeckoApi = 'https://api.coingecko.com/api/v3/coins/{id}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false'
const useGetPriceDataFromCoingecko = (id: string) => {
  const [data, setData] = useState<any | null>(null)
  const finalApi = coingeckoApi.replace("{id}", id);

  useEffect(() => {
    if (data) return;
    const fetchData = async () => {
      try {
        
        const response = await fetch(finalApi)
        const res: any = await response.json()
        
        setData(res)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [finalApi, setData, data])

  return data
}

export default useGetPriceDataFromCoingecko
