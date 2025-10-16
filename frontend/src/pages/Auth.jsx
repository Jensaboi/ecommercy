import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { fetchUser } from "../lib/api";
import { useUser } from "../context/UserProvider";
import { useEffect } from "react";

export async function loader() {
  try {
    const me = await fetchUser();

    return { me };
  } catch (err) {
    console.error(err);
    throw redirect("/login?errorMessage=You must login to access this page.");
  }
}
export default function Auth() {
  const { me } = useLoaderData();
  const { user, handleSetUser } = useUser();

  useEffect(() => {
    handleSetUser(me);
  }, [me, handleSetUser]);

  if (!user)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  return <Outlet />;
}
