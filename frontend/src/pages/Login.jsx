import { Form, Link, redirect } from "react-router-dom";
import { login } from "../lib/api.js";

export async function action({ request, params }) {
  const formData = await request.formData();

  const { email, password } = Object.fromEntries(formData);

  try {
    const user = await login({ email, password });
    console.log(user);
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
}

export default function Login() {
  return (
    <div className="w-full h-full pt-20">
      <Form
        method="POST"
        className="flex flex-col gap-6 text-white p-6 rounded-md bg-zinc-800 max-w-100 mx-auto"
      >
        <h1 className="text-2xl text-white font-medium mb-6">Login</h1>
        <div className="flex flex-col">
          <label className="text-lg font-normal" htmlFor="email">
            Email
          </label>
          <input
            required
            className="w-full p-2 bg-white rounded-sm text-zinc-800 placeholder:text-zinc-800"
            name="email"
            id="email"
            type="email"
            placeholder="email@example.com..."
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-normal" htmlFor="password">
            Password
          </label>
          <input
            required
            className="w-full p-2 bg-white rounded-sm text-zinc-800 placeholder:text-zinc-800"
            name="password"
            id="password"
            type="password"
            placeholder="*********"
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
