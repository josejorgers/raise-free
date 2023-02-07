import { configureChains, goerli, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
 
export const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [alchemyProvider({
    apiKey: process.env.REACT_APP_API_KEY
  })],
)

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider
})