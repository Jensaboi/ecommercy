import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="px-2 py-10 h-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
