import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { customTheme, darkTheme, lightTheme } from '../themes'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface Props extends AppProps {
  theme: string
}

function MyApp({ Component, pageProps, theme }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') ?? 'light'
    const selectedTheme = cookieTheme === 'light'
      ? lightTheme
      : cookieTheme === 'dark'
        ? darkTheme
        : customTheme

    setCurrentTheme(selectedTheme)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }
//   const validTheme = ['light', 'dark', 'custom']
//
//   return {
//     theme: validTheme.includes(theme) ? theme : 'light'
//   }
// }

export default MyApp
