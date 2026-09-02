import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccountEffect } from 'wagmi';
import { useAppDispatch } from '../store/hook';
import { addressActions } from '../store/addressSlice';

export function WalletAddressSync() {
  const dispatchAddress = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sessionStarted = useRef(false);

  useAccountEffect({
    onConnect({ address, isReconnected }) {
      if (!address) return;

      dispatchAddress(addressActions.switch(address));

      if (!sessionStarted.current) {
        sessionStarted.current = true;
        if (isReconnected) return; // silent reconnect after a page load: store only.
      }

      if (pathname !== `/address/${address}`) {
        navigate(`/address/${address}`);
      }
    },
  });

  return null;
}
