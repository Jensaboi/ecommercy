import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
