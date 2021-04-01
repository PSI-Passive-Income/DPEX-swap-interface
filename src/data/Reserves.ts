import { TokenAmount, Pair, Currency } from '@passive-income/dpex-sdk'
import { useMemo } from 'react'
// import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import IDPexPairABI from '@passive-income/dpex-swap-core/abi/contracts/interfaces/IDPexPair.sol/IDPexPair.json'
import { Interface } from '@ethersproject/abi'
import { useActiveWeb3React } from '../hooks'

import { FACTORY_ADDRESS, INIT_CODE_HASH } from '../constants'
import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { wrappedCurrency } from '../utils/wrappedCurrency'

const PAIR_INTERFACE = new Interface(IDPexPairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID
}

export function usePairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const { chainId } = useActiveWeb3React()

  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId)
      ]),
    [chainId, currencies]
  )

  const pairAddresses = useMemo(
    () => {
      if (tokens && chainId) {
        return tokens.map(([tokenA, tokenB]) => {
          return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(FACTORY_ADDRESS[chainId], INIT_CODE_HASH, tokenA, tokenB) : undefined
        });
      }
      return [];
    }, [chainId, tokens]
  )

  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB) || !chainId) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

      return [
        PairState.EXISTS,
        new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()), FACTORY_ADDRESS[chainId], INIT_CODE_HASH)
      ];
    })
  }, [results, tokens, chainId])
}

export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  return usePairs([[tokenA, tokenB]])[0]
}
