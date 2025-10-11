import { Outlet } from "react-router-dom";
import { fetchUser, fetchCategories } from "./lib/api";
import { useLoaderData } from "react-router-dom";

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
