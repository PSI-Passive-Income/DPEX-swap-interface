import { ChainId, Pair, Route } from '@passive-income/dpex-sdk'
import {
  BASE_FACTORY_ADDRESS,
  PANCAKESWAP_FACTORY_ADDRESS,
  PANCAKESWAP_FACTORY_ADDRESSV1,
  BAKERYSWAP_FACTORY_ADDRESS,
  JULSWAP_FACTORY_ADDRESS,
  APESWAP_FACTORY_ADDRESS
} from '../constants'

// Get's the name for a factory
export function getFactoryName(
  chainId: ChainId,
  factory: string
): string {
  if (factory === BASE_FACTORY_ADDRESS[chainId]) return "PSI Dex"
  if (factory === PANCAKESWAP_FACTORY_ADDRESS) return "PancakeSwap"
  if (factory === PANCAKESWAP_FACTORY_ADDRESSV1) return "PancakeSwap (v1)"
  if (factory === BAKERYSWAP_FACTORY_ADDRESS) return "BakerySwap"
  if (factory === JULSWAP_FACTORY_ADDRESS) return "JulSwap"
  if (factory === APESWAP_FACTORY_ADDRESS) return "ApeSwap"
  return "Unkown";
}
export function getFactoryNameByPair(
  pair: Pair
): string {
  return getFactoryName(pair.chainId, pair.factory);
}

export function getFactoriesFromRoute(
  route: Route
): string[] {
  if (!route.pairs) return [];
  return Object.keys(route.pairs.reduce((uniquePairs: { [key: string]: number }, pair) => {
    uniquePairs[pair.factory] = uniquePairs[pair.factory] ? uniquePairs[pair.factory]++ : 1;
    return uniquePairs;
  }, {}));
}
export function usingDifferentFactories(
  route: Route
): boolean {
  return getFactoriesFromRoute(route).length > 1;
}
