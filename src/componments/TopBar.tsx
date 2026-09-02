import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAddressSearch } from "../hooks/useAddressSearch";

export function TopBar() {
  const { inputRef, resolving, error, handleSearch, clearError } = useAddressSearch();

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
      {/* Left Section: Logo and Navigation */}
      <div className="flex items-center space-x-8 max-w-350 mx-auto">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff6b4a]">
            <span className="text-xl font-bold text-white">T</span>
          </div>
          <span className="text-xl font-bold text-[#2d3748]">TokenSync</span>
        </div>

        <nav className="hidden space-x-6 md:flex">

        </nav>
      </div>

      {/* Right Section: Search and Wallet */}
      <div className="flex items-center space-x-4 max-w-350 mx-auto">
        {/* Search Bar */}
        <div className="relative w-80">
          <div className="relative w-full">
            <span
            className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-on-surface-variant transition-all duration-200 hover:scale-110 hover:text-primary hover:drop-shadow ${resolving ? 'animate-spin text-primary pointer-events-none' : ''}`}
            onClick={handleSearch}
            >
            {resolving ? 'progress_activity' : 'search'}
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
            onChange={clearError}
            />
            {error && (
            <p className="absolute left-0 top-full z-50 mt-1 whitespace-nowrap rounded-md bg-white px-2 py-1 text-left text-body-sm text-error shadow-level-1">
              {error}
            </p>
            )}
          </div>
        </div>

        {/* Icons and Wallet Button */}
        <div className="flex items-center space-x-4">
          <ConnectButton/>
        </div>
      </div>
    </header>
  );
};
