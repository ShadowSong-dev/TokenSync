import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./componments/Layout";
import { WalletAddressSync } from "./componments/WalletAddressSync";
import { Dashboard } from "./pages/dashboard";

export function App() {

  return (
    <BrowserRouter>
      <WalletAddressSync />
      <Routes>
        <Route path="/" element={<Layout/>} />
        <Route path="/address/:address" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}
