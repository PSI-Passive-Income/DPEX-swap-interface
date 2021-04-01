// eslint-disable-next-line import/no-unresolved
import { PancakeTheme as DPEXTheme } from '@passive-income/dpex-uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends DPEXTheme {}
}
