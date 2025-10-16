import { useUser } from "../context/UserProvider";

export async function loader() {
  try {
  } catch (err) {
    console.log(err.error);
  }
}

export default function Dashboard() {
  const { user } = useUser();
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
