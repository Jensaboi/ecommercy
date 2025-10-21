import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { login } from "../lib/api.js";
import { useEffect } from "react";
import { useUser } from "../context/UserProvider.jsx";
import { useCart } from "../context/CartProvider.jsx";

export async function loader({ request }) {
  const url = new URL(request.url);
  const { errorMessage } = Object.fromEntries(url.searchParams);

  return errorMessage;
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const { email, password } = Object.fromEntries(formData);

  try {
    const user = await login({ email, password });

    return { user };
  } catch (err) {
    return { error: err.message };
  }
}

export default function Login() {
  const loaderError = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  const { handleSetUser } = useUser();
  const { reFetchCart } = useCart();

  const error = actionData?.error ? actionData.error : loaderError;

  // When action returns a user, update context and navigate
  useEffect(() => {
    if (actionData?.user) {
      handleSetUser(actionData.user);
      reFetchCart();
      navigate("/dashboard");
    }
  }, [actionData, handleSetUser, navigate]);

  return (
    <div className="w-full h-full pt-20">
      <Form
        method="POST"
        className="flex flex-col gap-6 text-white p-6 rounded-md bg-zinc-800 max-w-100 mx-auto"
      >
        <h1 className="text-2xl text-white font-medium mb-3">Login</h1>

        {error && <p className="error-text">{error}</p>}

        <div className="flex flex-col">
          <label className="text-lg font-normal" htmlFor="email">
            Email
          </label>
          <input
            required
            className="input-text"
            name="email"
            id="email"
            type="email"
            placeholder="email@example.com..."
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-normal" htmlFor="password">
            Password
          </label>
          <input
            required
            className="input-text"
            name="password"
            id="password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <button className="bg-zinc-600 self-center px-8 text-white font-medium rounded-md hover:bg-zinc-500 active:bg-zinc-700 hover:cursor-pointer py-2 shadow-lg">
          Login
        </button>
        <p className="text-white">
          Don’t have an account?{" "}
          <Link to={"/register"} className="text-blue-400">
            Register here.
          </Link>
        </p>
      </Form>
    </div>
  );
}
