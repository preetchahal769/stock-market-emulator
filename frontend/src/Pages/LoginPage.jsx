import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-xl shadow-md p-10 max-w-md w-full">
        <div className="flex flex-col justify-center items-start">
          <h2 className="text-3xl font-medium text-black mb-4">Login</h2>
          <p className="text-gray-600 mb-6"> Login to your account</p>
        </div>

        <form
          className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6"
          onSubmit={handleSubmit}
        >
          <div className="sm:col-span-6">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-500"
            >
              Email
            </label>
            <input
              type="text"
              id="Email"
              name="Email"
              className="mt-1 p-2 block w-full rounded-md border-[1px] border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
              placeholder="example@ex.com"
            />
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 block w-full rounded-md border-[1px] border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
              placeholder="1234567890"
            />{" "}
          </div>

          <div className="sm:col-span-6">
            <button
              type="submit"
              className="mt-1 p-2 block w-full rounded-md border-[1px] bg-indigo-500 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex flex-row justify-center items-center mt-4">
          {" "}
          <Link to="/signup" className="text-indigo-500 hover:text-indigo-800">
            Didn't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
