import { ChainId, Currency, CurrencyAmount, Pair, Trade } from '@passive-income/dpex-sdk'
import { createAction } from '@reduxjs/toolkit'

export const getTradesExactIn = createAction<{ chainId: ChainId, allowedPairs: Pair[], currencyAmountIn: CurrencyAmount, currencyOut: Currency }>(
  'trades/getTradesExactIn'
)
export const getTradesExactOut = createAction<{ chainId: ChainId, allowedPairs: Pair[], currencyIn: Currency, currencyAmountOut: CurrencyAmount }>(
  'trades/getTradesExactOut'
)
export const addTradesExactIn = createAction<{ chainId: ChainId, trades: Trade[] }>(
  'trades/addTradesExactIn'
)
export const addTradesExactOut = createAction<{ chainId: ChainId, trades: Trade[] }>(
  'trades/addTradesExactOut'
)
