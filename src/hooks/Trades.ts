import { ChainId, Currency, CurrencyAmount, Pair, Token, Trade } from '@passive-income/dpex-sdk'
import flatMap from 'lodash.flatmap'
import { useMemo } from 'react'

import { BASES_TO_CHECK_TRADES_AGAINST, BASE_FACTORY_ADDRESS, CUSTOM_BASES } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { wrappedCurrency } from '../utils/wrappedCurrency'

import { useActiveWeb3React } from './index'

function useAllCommonPairs(currencyA?: Currency, currencyB?: Currency): Pair[] {
  const { chainId } = useActiveWeb3React()

  // Base tokens for building intermediary trading routes
  const bases: Token[] = useMemo(() => (chainId ? BASES_TO_CHECK_TRADES_AGAINST[chainId] : []), [chainId])

  // All pairs from base tokens
  const basePairs: [Token, Token][] = useMemo(
    () =>
      flatMap(bases, (base): [Token, Token][] => bases.map((otherBase) => [base, otherBase])).filter(
        ([t0, t1]) => t0.address !== t1.address
      ),
    [bases]
  )

  const [tokenA, tokenB] = chainId
    ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
    : [undefined, undefined]

  const allPairCombinations: [Token, Token][] = useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
            // This filter will remove all the pairs that are not supported by the CUSTOM_BASES settings
            // This option is currently not used on PSI DEX
            .filter(([t0, t1]) => {
              if (!chainId) return true
              const customBases = CUSTOM_BASES[chainId]
              if (!customBases) return true

              const customBasesA: Token[] | undefined = customBases[t0.address]
              const customBasesB: Token[] | undefined = customBases[t1.address]

              if (!customBasesA && !customBasesB) return true
              if (customBasesA && !customBasesA.find((base) => t1.equals(base))) return false
              if (customBasesB && !customBasesB.find((base) => t0.equals(base))) return false

              return true
            })
        : [],
    [tokenA, tokenB, bases, basePairs, chainId]
  )

  const allPairs = usePairs(allPairCombinations)

  // only pass along valid pairs, non-duplicated pairs
  return useMemo(
    () =>
      Object.values(
        allPairs
          // filter out invalid pairs
          .filter((result): result is [PairState.EXISTS, Pair] => Boolean(result[0] === PairState.EXISTS && result[1]))
          // filter out duplicated pairs
          .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
            memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr
            return memo
          }, {})
      ),
    [allPairs]
  )
}

/**
 * Sorting that sorts the base factory as first when price impact is below the `maxPriceImpact`
 */
function sortTrades(chainId: ChainId, maxPriceImpact: number, tradeA: Trade, tradeB: Trade): number {
  const baseFactory: string = BASE_FACTORY_ADDRESS[chainId]
  const aFirstFactory = tradeA.route.pairs.length > 0 ? tradeA.route.pairs[0].factory : null
  const aLastFactory = tradeA.route.pairs.length > 0 ? tradeA.route.pairs[tradeA.route.pairs.length - 1].factory : null
  const bFirstFactory = tradeB.route.pairs.length > 0 ? tradeB.route.pairs[0].factory : null
  const bLastFactory = tradeB.route.pairs.length > 0 ? tradeB.route.pairs[tradeB.route.pairs.length - 1].factory : null
  const aPriceImpact = parseFloat(tradeA.priceImpact.toFixed(2))
  const bPriceImpact = parseFloat(tradeB.priceImpact.toFixed(2))
  if (aFirstFactory === baseFactory && aLastFactory === baseFactory && (bFirstFactory !== baseFactory || bLastFactory !== baseFactory) && aPriceImpact <= maxPriceImpact)
    return -1;
  if (bFirstFactory === baseFactory && bLastFactory === baseFactory && (aFirstFactory !== baseFactory || aLastFactory !== baseFactory) && bPriceImpact <= maxPriceImpact)
    return 1;
  if ((aFirstFactory === baseFactory || aLastFactory === baseFactory) && bFirstFactory !== baseFactory && bLastFactory !== baseFactory && aPriceImpact <= maxPriceImpact)
    return -1;
  if ((bFirstFactory === baseFactory || bLastFactory === baseFactory) && aFirstFactory !== baseFactory && aLastFactory !== baseFactory && bPriceImpact <= maxPriceImpact)
    return 1;
  return 0;
}
/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export function useTradeExactIn(chainId: ChainId | undefined, currencyAmountIn?: CurrencyAmount, currencyOut?: Currency): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyAmountIn?.currency, currencyOut)
  
  return useMemo(() => {
    if (chainId && currencyAmountIn && currencyOut && allowedPairs.length > 0) {
      const trades = Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 3, maxNumResults: 3 })
      const sortedTrades = trades.sort((a, b) => sortTrades(chainId, 3, a, b))
      return sortedTrades[0] ?? null
    }
    return null
  }, [allowedPairs, chainId, currencyAmountIn, currencyOut])
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useTradeExactOut(chainId: ChainId | undefined, currencyIn?: Currency, currencyAmountOut?: CurrencyAmount): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut?.currency)

  return useMemo(() => {
    if (chainId && currencyIn && currencyAmountOut && allowedPairs.length > 0) {
      const trades = Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: 3, maxNumResults: 3 })
      const sortedTrades = trades.sort((a, b) => sortTrades(chainId, 3, a, b))
      return sortedTrades[0] ?? null
    }
    return null
  }, [allowedPairs, chainId, currencyIn, currencyAmountOut])
}
