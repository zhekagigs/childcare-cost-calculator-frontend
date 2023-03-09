import '@/styles/globals.css'
import '../../node_modules/mini.css/dist/mini-dark.min.css';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
