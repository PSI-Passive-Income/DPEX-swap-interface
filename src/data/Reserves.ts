import { TokenAmount, Pair, Currency } from '@passive-income/dpex-sdk'
import { useMemo } from 'react'
// import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import IDPexPairABI from '@passive-income/dpex-swap-core/abi/contracts/interfaces/IDPexPair.sol/IDPexPair.json'
import { Interface } from '@ethersproject/abi'
import { useActiveWeb3React } from '../hooks'

import { FACTORY_ADDRESSES } from '../constants'
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

  const pairTokens = useMemo(
    () => {
      if (tokens && chainId) {
        return tokens.map(([tokenA, tokenB]) => {
          return tokenA && tokenB && !tokenA.equals(tokenB) ? Object.entries(FACTORY_ADDRESSES[chainId]).map(([factory, initCodeHash]) => {
            return {
              pairAddress: Pair.getAddress(factory, initCodeHash, tokenA, tokenB),
              factory,
              initCodeHash,
              tokenA,
              tokenB
            }
          }) : undefined
        }).flat().reduce((address, value) => {
          if (value !== undefined) address[value.pairAddress] = value;
          return address;
        }, {})
      }
      return {};
    }, [chainId, tokens]
  )
  
  const results = useMultipleContractSingleData(Object.entries(pairTokens).map(([pair]) => pair), PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result) => {
      const { result: reserves, loading } = result
      if (loading) return [PairState.LOADING, null]
      if (!chainId || !result.address || !pairTokens[result.address]) return [PairState.INVALID, null]

      const pairToken = pairTokens[result.address]
      const {tokenA, tokenB} = pairToken
      
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

      return [
        PairState.EXISTS,
        new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()), pairToken.factory, pairToken.initCodeHash)
      ];
    })
  }, [results, chainId, pairTokens])
}

export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  const pairs = usePairs([[tokenA, tokenB]])
  return pairs && pairs.length > 0 ? pairs[0] : [PairState.NOT_EXISTS, null]
}
