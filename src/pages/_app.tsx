import '@/styles/globals.css'
import '../../node_modules/mini.css/dist/mini-default.min.css';

import type { AppProps } from 'next/app'

//@ts-ignore
global.performance = global.performance || {
  now: () => new Date().getTime(),
};


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
