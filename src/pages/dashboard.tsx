import { useEffect, useState } from "react";
import { TopBar } from "../componments/TopBar";
import { useAppSelector } from "../store/hook";
import { useQuery, type UseQueryReturnType } from "wagmi/query";
import { fetchTokensBalance, type Token_Balances_By_Wallet_Return_tokens } from "../utils/alchemy";

type Chain = {
  name: string;
  image: string;
};

export function Dashboard() {
    const address = useAppSelector((state)=> state.addressReducer);
    const [chains, setChains] = useState<Chain[]>([]);

    const result: UseQueryReturnType<Token_Balances_By_Wallet_Return_tokens[] | void> = useQuery({
        queryKey: [address],
        queryFn: async ()=> {
            const resarr = await fetchTokensBalance(address);
            if(Array.isArray(resarr)) {
                return resarr.flat();
            }
        }
    })

    useEffect(() => {
        fetch("/chains.json")
            .then((res) => res.json())
            .then((data: Chain[]) => setChains(data))
            .catch((err) => console.error("Failed to load chains:", err));
    }, []);

    return (
        <>
            <TopBar/>
            <main>
                {/* Profile Header Container */}
                <div className="max-w-container-max mx-auto px-margin-desktop relative pb-8 border-b border-border-light">
                {/* Avatar & Initial Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-16 mb-6">
                    <div className="flex items-end gap-4">
                    <div className="relative">
                        <img
                        className="w-32 h-32 rounded-xl border-4 border-surface bg-surface shadow-sm object-cover"
                        data-alt="A pixel art style profile picture character, square-shaped, wearing sunglasses and a crown, with a small blue verification badge icon overlapping the bottom right corner."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_-I8-G-S5FXrv1xNSFKLyCXU_mGzROW2GmCbbQmp6LXAUW8e8GxXbnbUatv04I7pVaaKjhTGDlC3sEVS-wdXJH0O_VkQJ48cCpD8QBEB9XyWiebkp864OV4I_PCmnyVQriyzfLSF34jPBxWAMdDL2q3Rdp8Cyt5VUpCxo5kfDLei_3oaTvb9MjHfASBbGPU2R9K6-cqLx9do4v3ls3HQlMIVV0AsXkMjwmwIuHKD960RAG63M_-iF"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-1 border-2 border-surface">
                        <span
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            verified
                        </span>
                        </div>
                    </div>
                    <div className="pb-2">
                        <h1 className="font-display-lg text-display-lg text-on-surface mb-1 flex items-center gap-2">
                        {address}
                        </h1>
                        <div className="flex items-center gap-2 text-body-sm text-secondary">
                        <span>{address}</span>
                        <button className="text-tertiary hover:text-primary-container transition-colors">
                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        </button>
                        </div>
                    </div>
                    </div>

                    {/* Chart Area Placeholder (Right Side) */}
                    <div className="mt-4 md:mt-0 flex items-end">
                    <div className="text-right">
                        <div className="flex items-baseline justify-end gap-2">
                        <span className="font-display-lg text-display-lg">$0</span>
                        <span className="font-label-md text-label-md text-success-green flex items-center">
                            <span className="material-symbols-outlined text-[16px] mr-1">arrow_upward</span>
                            +0.76%
                        </span>
                        </div>
                        <div className="w-48 h-12 mt-1 relative">
                        {/* Sparkline placeholder */}
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Portfolio Content Grid */}
                <div className="max-w-container-max mx-auto px-margin-desktop py-6 flex gap-6">
                {/* Main Grid Area */}
                <div className="grow">

                    {/* Bento Grid for Chains */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {chains.map((chain) => (
                            <div key={chain.name} className="flex items-center gap-3 p-3 rounded-lg border border-border-light hover:bg-surface-container-low transition-colors cursor-pointer group">
                            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-surface-container-low">
                                <img
                                src={chain.image}
                                alt={chain.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-label-sm text-label-sm text-secondary group-hover:text-on-surface transition-colors">
                                {chain.name}
                                </span>
                                <div className="flex items-baseline gap-1">
                                <span className="font-headline-sm text-headline-sm text-on-surface">$0</span>
                                <span className="font-body-sm text-body-sm text-tertiary">-%</span>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </main>
        </>

    )
}
