import React, { useContext } from 'react'
import { Menu as UikitMenu} from '@passive-income/dpex-uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceDataFromCoingecko from 'hooks/useGetPriceDataFromCoingecko'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import links from './config'

const Menu: React.FC = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()

  let psiPriceUsd: number | undefined;
  const priceData = useGetPriceDataFromCoingecko("passive-income");
  if (priceData) {
    const tickers = (priceData.tickers as any[]).filter(t => t.base === "0X9A5D9C681DB43D9863E9279C800A39449B7E1D6F")
    if (tickers) {
      psiPriceUsd = tickers[0].converted_last.usd
    }
  }

  const profile = useGetLocalProfile()

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      psiPriceUsd={psiPriceUsd}
      profile={profile}
      {...props}
    />
  )
}

export default Menu
