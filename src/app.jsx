import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import {
  Outlet,
  ScrollRestoration,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import SearchResult from "./components/search-result";
import ShoppingCart from "./components/shopping-cart";
import LogoutConfirmationModal from "./components/confirm-logout-modal";

function App() {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("q");
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Navbar />
      <main className="p-4">
        {searchTerm?.trim?.() && <SearchResult />}
        <Outlet />
        <ShoppingCart />
      </main>
      <Footer />
      <ScrollRestoration />
      <Toaster />
      <LogoutConfirmationModal />
    </NextUIProvider>
  );
}

export default App;
