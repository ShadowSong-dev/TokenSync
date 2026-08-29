const BASE_URL = 'https://tokensync-api.shadowsong-dev.workers.dev/';

// API return
export type Token_Balances_By_Wallet_Return_tokens = {
  address: string,
  network: string,
  tokenAddress: string | null,
  tokenBalance: string
}
export type Worker_Retern = Token_Balances_By_Wallet_Return_tokens[][] | { error: string };

export async function fetchTokensBalance(address: string) {
  const url = new URL(BASE_URL);
  url.searchParams.set('address', address);

  const reqInit = new Request(url);

  const res = await fetch(reqInit);
  return await res.json() as Worker_Retern;
}
