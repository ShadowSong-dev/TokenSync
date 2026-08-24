import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./componments/Layout";
import { Dashboard } from "./pages/dashboard";

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} />
        <Route path="/address/*"element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}
