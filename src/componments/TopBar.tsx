import { ConnectButton } from "@rainbow-me/rainbowkit";

export function TopBar() {
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
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full rounded-full border border-gray-200 bg-[#f7fafc] py-2 pl-10 pr-4 text-sm focus:border-[#ff6b4a] focus:outline-none focus:ring-1 focus:ring-[#ff6b4a]"
            placeholder="Search address / ENS "
          />
        </div>

        {/* Icons and Wallet Button */}
        <div className="flex items-center space-x-4">
          <ConnectButton/>
        </div>
      </div>
    </header>
  );
};
