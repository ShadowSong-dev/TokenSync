import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';

export const RainbowKitconfig = getDefaultConfig({
  appName: import.meta.env.VITE_APP_NAME,
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base],
});
