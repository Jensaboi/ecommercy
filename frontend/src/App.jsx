import { Outlet } from "react-router-dom";
import { fetchCategories } from "./lib/api";

export async function loader() {
  try {
    const categories = await fetchCategories();

    return { categories };
  } catch (err) {}
}

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
