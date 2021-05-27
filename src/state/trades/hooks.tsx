import { Currency, CurrencyAmount, Pair, Trade } from '@passive-income/dpex-sdk'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveWeb3React } from '../../hooks'
import { AppDispatch, AppState } from '../index'
import {
  getTradesExactIn,
} from './actions'

export function useGetTradeExactIn(
  allowedPairs: Pair[],
  currencyAmountIn?: CurrencyAmount,
  currencyOut?: Currency
): Trade[] {
  const { chainId } = useActiveWeb3React()
  const trades = useSelector<AppState, AppState['trades']>(
    (state) => state.trades
  )
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (!chainId || !allowedPairs || !currencyAmountIn || !currencyOut) return undefined
    return () => {
      dispatch(
        getTradesExactIn({
          chainId,
          allowedPairs,
          currencyAmountIn,
          currencyOut
        })
      )
    }
  }, [chainId, dispatch, allowedPairs, currencyAmountIn, currencyOut])

  return useMemo(
    () => {
      if (!chainId || !trades || !trades[chainId] || !trades[chainId].tradesIn) return []
      return trades[chainId].tradesIn
    }, [chainId, trades]
  )
}

export function useGetTradeExactOut(
  allowedPairs: Pair[],
  currencyAmountIn: CurrencyAmount,
  currencyOut: Currency
): Trade[] {
  const { chainId } = useActiveWeb3React()
  const trades = useSelector<AppState, AppState['trades']>(
    (state) => state.trades
  )
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (!chainId || !allowedPairs || !currencyAmountIn || !currencyOut) return undefined
    return () => {
      dispatch(
        getTradesExactIn({
          chainId,
          allowedPairs,
          currencyAmountIn,
          currencyOut
        })
      )
    }
  }, [chainId, dispatch, allowedPairs, currencyAmountIn, currencyOut])

  return useMemo(
    () => {
      if (!chainId || !trades || !trades[chainId] || !trades[chainId].tradesIn) return []
      return trades[chainId].tradesIn
    }, [chainId, trades]
  )
}
