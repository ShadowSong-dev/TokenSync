const BASE_URL = 'https://tokensync-api.shadowsong-dev.workers.dev/';

export type TokenItem = {
  network: string;
  address: string | null; //contract address; null = native
  decimals: number;
  balance: number;
  value: number;
  lastUpdateAt: number;
};

// Worker return
type Success = { ok: true; data: TokenItem[]; address: string };
type Failure = { ok: false; error: string };
export type TokensBalanceResult = Success | Failure;

export async function fetchTokensBalance(address: string): Promise<TokensBalanceResult> {
  const url = new URL(BASE_URL);
  url.searchParams.set('address', address);

  const res = await fetch(url);
  if (!res.ok) {
    return { ok: false, error: `request failed (status: ${res.status})` };
  }
  return (await res.json()) as TokensBalanceResult;
}
