import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAddress, isAddress } from 'viem';
import { resolveEnsName } from '../utils/ens';
import { useAppDispatch } from '../store/hook';
import { addressActions } from '../store/addressSlice';

const ENS_ERROR_MESSAGES = {
  'invalid-name': 'Enter a valid address or ENS name.',
  'not-found': 'No address found for that ENS name.',
  'network': "Couldn't resolve that ENS name — try again.",
} as const;

export function useAddressSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  // Guards against a double submit racing before `resolving` propagates to a re-render.
  const busyRef = useRef(false);

  const dispatchAddress = useAppDispatch();
  const navigate = useNavigate();

  const [resolving, setResolving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function goToAddress(address: string) {
    dispatchAddress(addressActions.switch(address));
    navigate(`/address/${address}`);
  }

  async function handleSearch() {
    if (busyRef.current) return;

    const raw = inputRef.current?.value.trim();
    if (!raw) return;

    if (isAddress(raw)) {
      goToAddress(getAddress(raw));
      return;
    }

    // Not an address → try resolving it as an ENS name.
    busyRef.current = true;
    setResolving(true);
    setError(null);
    try {
      const result = await resolveEnsName(raw);
      if (!result.ok) {
        setError(ENS_ERROR_MESSAGES[result.reason]);
        return;
      }
      goToAddress(result.address);
    } finally {
      busyRef.current = false;
      setResolving(false);
    }
  }

  function clearError() {
    if (error) setError(null);
  }

  return { inputRef, resolving, error, handleSearch, clearError };
}
