import { redirect, useLoaderData } from "react-router-dom";
import { fetchUser } from "../lib/api";

export async function loader() {
  try {
    const user = await fetchUser();

    return { user };
  } catch (err) {
    console.log(err);
    return redirect("/login");
  }
}
export default function Dashboard() {
  const { user } = useLoaderData();
  console.log(user);
  return (
    <div>
      <h1>
        Welcome{" "}
        {user.name.split("")[0].toUpperCase() +
          user.name.slice(1).toLowerCase()}
      </h1>
    </div>
  );
}
