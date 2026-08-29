import { ConnectButton } from "@rainbow-me/rainbowkit";
import { addressActions } from "../store/addressSlice";
import { useAppDispatch } from "../store/hook";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const heroBg = "https://lh3.googleusercontent.com/aida/AEtjO1VvLCVYMI8XYsYl7qvXvBxT6TriGCjxV0KiOrNXChjOW5O_wfX2pkxlVA5BqEGHfx12wfFyH1NC23XTNRliUDZkaUrs7LwGRN1Zgb-i8cir6mg--fnEHx_KPEjkaJ_EulS7bXKHBZuL_RvtP_p-Tao7wzMErZ0JM77PCcM86wZXdjp3SMaEReTBOfKM3I5H8P8B3fiF5tUJeEHBi9cqAEjngJ6AeNMaIz41-IElCWf4Ek5qvbjZggRAVeY";

export function Home() {
    const dispatchAddress = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const _navigate = useNavigate();
    function navigate(address: string | null) {
        if(!address) return;
        _navigate(`/address/${address}`);
    }

    function handleSearch() {
        const value = inputRef.current?.value.trim();
        if(!value) return;
        dispatchAddress(addressActions.switch(value));
        navigate(value);
    }

    return (
        <>
            <section className="relative overflow-hidden px-margin-mobile pb-16 pt-20 text-center md:px-margin-desktop">
                <div className="pointer-events-none absolute inset-0 z-0 flex justify-center pt-10 opacity-20">
                    <img src={heroBg} alt="" className="h-auto max-w-full" />
                </div>
                <div className="relative z-10 mx-auto max-w-3xl">
                    <h1 className="mb-4 font-display-lg text-headline-lg-mobile text-on-background md:text-display-lg">
                    Your go-to portfolio tracker for Ethereum and EVM
                    </h1>

                    <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row">
                    <div className="relative w-full">
                        <span
                        className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-on-surface-variant transition-all duration-200 hover:scale-110 hover:text-primary hover:drop-shadow"
                        onClick={handleSearch}
                        >
                        search
                        </span>
                        <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search address/ENS"
                        className="w-full rounded-lg border border-border-light bg-surface-subtle py-3 pl-12 pr-4 outline-none transition-all focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                        onKeyDown={(e)=> {
                            if(e.key == 'Enter') {
                                handleSearch();
                            };
                        }}
                        />
                    </div>
                    <h1>Or</h1>
                    <div className="w-full whitespace-nowrap py-3 sm:w-auto"><ConnectButton/></div>   
                    </div>
                </div>
            </section>
        </>
    )
}