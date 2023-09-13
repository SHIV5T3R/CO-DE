import React, { useState } from "react";

import useUserStore from "../../apps/userStore";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register } = useUserStore();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="text-center text-2xl font-semibold">Register</h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Create a new account
        </p>
        <div className="mt-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full rounded-lg border border-gray-300 p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
