import { Trade } from '@passive-income/dpex-sdk'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveWeb3React } from '../../hooks'
import { AppDispatch, AppState } from '../index'
import { addTradesExactIn } from './actions'

export default function Updater(): null {
  const { chainId } = useActiveWeb3React()

  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector<AppState, AppState['trades']>((s) => s.trades)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const trades = chainId ? state[chainId] ?? undefined : undefined

  useEffect(() => {
    console.log("checking trades");
    if (!chainId || !trades?.currencyAmountIn || !trades?.currencyOut) return

    console.log("fetching trades", trades?.allowedPairs, trades?.currencyAmountIn, trades?.currencyOut);
    Trade.bestTradeExactIn(trades?.allowedPairs, trades?.currencyAmountIn, trades?.currencyOut, { maxHops: 3, maxNumResults: 3 })
      .then((tradesExactIn: Trade[]) => {
        console.log("retrieved trades", tradesExactIn);
        dispatch(
          addTradesExactIn({
            chainId,
            trades: tradesExactIn
          })
        )
      })
      .catch((error) => {
        console.error(`Failed to retrieve tradesExactIn`, error)
      })
  }, [chainId, trades?.allowedPairs, trades?.currencyAmountIn, trades?.currencyOut, dispatch])

  // useEffect(() => {
  //   if (!chainId || !trades?.currencyIn || !trades?.currencyAmountOut) return

  //   Trade.bestTradeExactIn(trades?.allowedPairs, trades?.currencyAmountIn, trades?.currencyOut, { maxHops: 3, maxNumResults: 3 })
  //     .then((tradesExactIn: Trade[]) => {
  //       dispatch(
  //         addTradesExactIn({
  //           chainId,
  //           trades: tradesExactIn
  //         })
  //       )
  //     })
  //     .catch((error) => {
  //       console.error(`Failed to retrieve tradesExactIn`, error)
  //     })
  // }, [chainId, trades?.allowedPairs, trades?.currencyAmountIn, trades?.currencyOut, dispatch])

  return null
}
