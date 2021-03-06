import { MenuEntry, LinkStatus } from '@passive-income/dpex-uikit'

const status = {
  LIVE: <LinkStatus>{
    text: "LIVE",
    color: "failure",
  },
  SOON: <LinkStatus>{
    text: "SOON",
    color: "warning",
  },
  NEW: <LinkStatus>{
    text: "NEW",
    color: "success",
  },
};

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://psidex.passive-income.io/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
      {
        label: 'Bridge',
        href: 'https://www.binance.org/en/bridge?utm_source=PSIDEX',
      },
    ],
  },
  {
    label: 'Earn',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_PSIDEX_URL}`,
    status: status.LIVE
  },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: 'https://psidex.passive-income.io/syrup',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: 'https://psidex.passive-income.io/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: 'https://psidex.passive-income.io/nft',
  // },
  // {
  //   label: 'Teams & Profile',
  //   icon: 'GroupsIcon',
  //   calloutClass: 'rainbow',
  //   items: [
  //     {
  //       label: 'Leaderboard',
  //       href: 'https://psidex.passive-income.io/teams',
  //     },
  //     {
  //       label: 'Task Center',
  //       href: 'https://psidex.passive-income.io/profile/tasks',
  //     },
  //     {
  //       label: 'Your Profile',
  //       href: 'https://psidex.passive-income.io/profile',
  //     },
  //   ],
  // },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://info.passive-income.io/',
      },
      {
        label: 'Tokens',
        href: 'https://info.passive-income.io/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://info.passive-income.io/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://info.passive-income.io/accounts',
      },
    ],
  },
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: 'https://psidex.passive-income.io/ifo',
  // },
  {
    label: "More",
    icon: "MoreIcon",
    items: [
      // {
      //   label: "Voting",
      //   href: "https://voting.pancakeswap.finance",
      // },
      {
        label: "PSI Website",
        href: "https://www.passive-income.io/",
      },
      {
        label: "Github",
        href: "https://github.com/PSI-Passive-Income",
      },
      {
        label: "Docs",
        href: "https://passiveincome.gitbook.io/whitepaper/",
      },
      {
        label: "Blog",
        href: "https://p6ss1ve1nc0me.medium.com/passive-income-psi-375e6768cecf",
      },
    ],
  },
]

export default config
