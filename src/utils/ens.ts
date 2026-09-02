import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(import.meta.env.VITE_MAINNET_RPC_URL),
});

export type EnsResolveResult =
  | { ok: true; address: string }
  | { ok: false; reason: 'invalid-name' | 'not-found' | 'network' };

export async function resolveEnsName(raw: string): Promise<EnsResolveResult> {
  let name: string;
  try {
    name = normalize(raw.trim());
  } catch {
    return { ok: false, reason: 'invalid-name' };
  }

  try {
    const address = await mainnetClient.getEnsAddress({ name });
    return address
      ? { ok: true, address }
      : { ok: false, reason: 'not-found' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
