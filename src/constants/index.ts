import { ChainId, JSBI, Percent, Token, WETH } from '@passive-income/dpex-sdk'

const routerAddress = process.env && process.env.REACT_APP_ROUTER_ADDRESS ? process.env.REACT_APP_ROUTER_ADDRESS as string : null;
export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: routerAddress ?? "0xa5cCA416d834C41f25b3A0EEEBA3D6D564968226",
  [ChainId.BSCTESTNET]: routerAddress ?? "0x662D0c613FDB18767D53Ef46010392a537c571D2",
  [ChainId.GANACHETESTNET]: routerAddress ?? "0xC7EF7b9BC9318336d4469481f58f24313ca8F582",
}

const factoryAddress = process.env && process.env.REACT_APP_FACTORY_ADDRESS ? process.env.REACT_APP_FACTORY_ADDRESS as string : null;
export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: factoryAddress ?? "0xB39b145F35fe5f6D7BC65FA1cF41Fa1F5D854FC8",
  [ChainId.BSCTESTNET]: factoryAddress ?? "0x1DeAFD0E3fa0C4088E3873494DBfC98CB76182B6",
  [ChainId.GANACHETESTNET]: factoryAddress ?? "0x30cc30Ee699a7390EA887E15Bb90b3668D4308Ec",
}

export const INIT_CODE_HASH = process?.env?.REACT_APP_INIT_CODE_HASH ?? "0x54b665638f92b86b60e97aad6ac1f67d1c8d80e418e17f46840e1f59eaec1764";

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.MAINNET, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin')
export const BUSD = new Token(ChainId.MAINNET, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'Binance USD')
export const BTCB = new Token(ChainId.MAINNET, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'Binance BTC')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD')
export const UST = new Token(
  ChainId.MAINNET,
  '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
  18,
  'UST',
  'Wrapped UST Token'
)
export const ETH = new Token(
  ChainId.MAINNET,
  '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  18,
  'ETH',
  'Binance-Peg Ethereum Token'
)

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
  [ChainId.GANACHETESTNET]: [WETH[ChainId.GANACHETESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, BTCB, USDT, UST, ETH],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, BTCB, USDT],
}

const psiAddress = process.env && process.env.REACT_APP_PSI_ADDRESS ? process.env.REACT_APP_PSI_ADDRESS as string : null;
export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, psiAddress ?? '0x9A5d9c681Db43D9863e9279c800A39449B7e1d6f', 9, 'PSI', 'Passive Income'),
      WETH[ChainId.MAINNET],
    ],
    [BUSD, USDT],
    [DAI, USDT],
  ],
  [ChainId.BSCTESTNET]: [
    [
      new Token(ChainId.BSCTESTNET, psiAddress ?? '0x066Bd99080eC62FE0E28bA687A53aC00794c17b6', 9, 'PSI', 'Passive Income'),
      WETH[ChainId.BSCTESTNET],
    ]
  ],
  [ChainId.GANACHETESTNET]: [
    [
      new Token(ChainId.GANACHETESTNET, psiAddress ?? '0xD30084E9d1271f803e26A0545E2D031013956D9E', 9, 'PSI', 'Passive Income'),
      WETH[ChainId.GANACHETESTNET],
    ]
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
