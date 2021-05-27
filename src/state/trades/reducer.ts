import { Currency, CurrencyAmount, Pair, Trade } from '@passive-income/dpex-sdk'
import { createReducer } from '@reduxjs/toolkit'
import {
  getTradesExactIn,
  getTradesExactOut,
  addTradesExactIn,
  addTradesExactOut,
} from './actions'

const currentTimestamp = () => new Date().getTime()

export interface TradeDetails {
  allowedPairs: Pair[]

  // the timestamp of the last tradesIn action
  lastTradesInTimestamp?: number
  currencyAmountIn: CurrencyAmount
  currencyOut: Currency
  tradesIn:Trade[]

  // the timestamp of the last tradesOut action
  lastTradesOutTimestamp?: number
  currencyIn: Currency
  currencyAmountOut: CurrencyAmount
  tradesOut: Trade[]

  timestamp?: number

  // tradesOut: {
  //   [chainId: number]: {
  //     // keyed by currencyIn:currencyAmountOut
  //     [key: string]: Trade[]
  //   }
  // }
}
export interface TradesState {
  [chainId: number]: TradeDetails
}

// function pairKey(token0Address: string, token1Address: string) {
//   return `${token0Address};${token1Address}`
// }

export const initialState: TradesState = {}

export default createReducer(initialState, builder =>
  builder
    .addCase(getTradesExactIn, (state, { payload: { chainId, allowedPairs, currencyAmountIn, currencyOut } }) => {
      state[chainId] = state[chainId] ?? {}
      state[chainId].tradesIn = state[chainId].tradesIn ?? {}
      state[chainId].allowedPairs = allowedPairs
      state[chainId].currencyAmountIn = currencyAmountIn
      state[chainId].currencyOut = currencyOut
      state[chainId].timestamp = currentTimestamp()
    })
    .addCase(getTradesExactOut, (state, { payload: { chainId, allowedPairs, currencyIn, currencyAmountOut } }) => {
      state[chainId] = state[chainId] ?? {}
      state[chainId].tradesOut = state[chainId].tradesOut ?? {}
      state[chainId].allowedPairs = allowedPairs
      state[chainId].currencyIn = currencyIn
      state[chainId].currencyAmountOut = currencyAmountOut
      state[chainId].timestamp = currentTimestamp()
    })
    .addCase(addTradesExactIn, (state, { payload: { chainId, trades } }) => {
      state[chainId] = state[chainId] ?? {}
      state[chainId].tradesIn = trades
      state[chainId].timestamp = currentTimestamp()
    })
    .addCase(addTradesExactOut, (state, { payload: { chainId, trades } }) => {
      state[chainId] = state[chainId] ?? {}
      state[chainId].tradesOut = trades
      state[chainId].timestamp = currentTimestamp()
    })
)
