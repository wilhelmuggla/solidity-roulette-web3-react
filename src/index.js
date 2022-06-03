import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <WagmiConfig client={wagmiClient}>
      <App chains={chains} provider={provider} />
    </WagmiConfig>
  </>
);

