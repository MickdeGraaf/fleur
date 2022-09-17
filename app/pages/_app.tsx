import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import {
  ReservoirKitProvider,
  lightTheme,
} from '@reservoir0x/reservoir-kit-ui'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {

  const theme = lightTheme({
    headlineFont: "'Syne', sans-serif",
    font: "'Syne', sans-serif",
    primaryColor: "#55DF00",
    primaryHoverColor: "#89db56",
  });

  const chakraTheme = extendTheme({
    fonts: {
      heading: "'Syne', sans-serif",
      body: "'Syne', sans-serif",
    },
    styles: {
      global: {
        body: {
          bg: "#E5E5E5",
        }
      }
    },
    config: {
      initialColorMode: "light",
    }
  });
  return (
    <ChakraProvider theme={chakraTheme}>
    <ReservoirKitProvider
      options={{
        apiBase: 'https://api.reservoir.tools',
        apiKey: 'YOUR-KEY'
      }}
      theme={theme}
    >
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ReservoirKitProvider>
    </ChakraProvider>
  );
}

export default MyApp;
