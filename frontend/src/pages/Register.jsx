import { Form, Link, redirect } from "react-router-dom";
import { register } from "../lib/api.js";

export async function action({ request, params }) {
  const formData = await request.formData();

  const { name, gender, email, password } = Object.fromEntries(formData);
  console.log({ name, gender, email, password });
  try {
    const result = await register({ name, gender, email, password });

    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    return err;
  }
}

export default function Register() {
  return (
    <div className="w-full h-full pt-20">
      <Form
        method="POST"
        className="flex flex-col gap-6 text-white p-6 rounded-md bg-zinc-800 max-w-100 mx-auto"
      >
        <h1 className="text-2xl text-white font-medium mb-6">Register</h1>
        <div className="flex flex-col">
          <label className="text-lg font-normal" htmlFor="name">
            Name
          </label>
          <input
            title="Enter your name here."
            required
            className="input-text"
            name="name"
            id="name"
            type="text"
            autoComplete="name"
            placeholder="name..."
          />
        </div>
        <div>
          <label htmlFor="gender">Select Gender:</label>
          <select autoComplete="sex" name="gender" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-normal" htmlFor="email">
            Email
          </label>
          <input
            title="Enter your email here."
            required
            className="input-text"
            name="email"
            id="email"
            type="email"
            autoComplete="email"
            placeholder="email@example.com..."
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-normal" htmlFor="password">
            Password
          </label>
          <input
            title="Enter your password here."
            required
            className="input-text"
            name="password"
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="*********"
          />
        </div>
        <button className="bg-zinc-600 self-center px-8 text-white font-medium rounded-md hover:bg-zinc-500 active:bg-zinc-700 hover:cursor-pointer py-2 shadow-lg">
          Register account
        </button>
        <p className="text-white">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-400">
            Sign in here.
          </Link>
        </p>
      </Form>
    </div>
  );
}
