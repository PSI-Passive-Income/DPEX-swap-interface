import { Trade } from '@passive-income/dpex-sdk'
import React, { Fragment, memo, useContext } from 'react'
import { ChevronRight } from 'react-feather'
import { Flex, Text } from '@passive-income/dpex-uikit'
import { ThemeContext } from 'styled-components'
import { getFactoryNameByPair, usingDifferentFactories } from 'utils/factories'
import CurrencyLogo from '../CurrencyLogo'

export default memo(function SwapRoute({ trade }: { trade: Trade }) {
  const theme = useContext(ThemeContext)
  const differentFactories = usingDifferentFactories(trade.route)
  
  return (
    <Flex
      px="1rem"
      py="0.5rem"
      my="0.5rem"
      style={{ border: `1px solid ${theme.colors.tertiary}`, borderRadius: '1rem' }}
      flexWrap="wrap"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {trade.route.path.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={i}>
            <Flex my="0.5rem" alignItems="center" style={{ flexShrink: 0 }}>
              <CurrencyLogo currency={token} size="1.5rem" />
              <Text fontSize="14px" color="text" ml="0.5rem">
                {token.symbol}
              </Text>
            </Flex>
            {isLastItem ? null : <ChevronRight fill="textSubtle" />}
            {!differentFactories || isLastItem ? null : (
              <>
                <Flex my="0.5rem" alignItems="center" style={{ flexShrink: 0 }}>
                  <Text fontSize="14px" color="text" ml="0.5rem">
                    {getFactoryNameByPair(trade.route.pairs[i])}
                  </Text>
                </Flex>
                <ChevronRight fill="textSubtle" />
              </>
            )}
          </Fragment>
        )
      })}
    </Flex>
  )
})
