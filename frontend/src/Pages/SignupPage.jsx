import { useState } from "react";
import DatePicker from "react-datepicker";
import { Eye, EyeOff } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

const SignupPage = () => {
  const [startDate, setStartDate] = useState();

  return (
    <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-xl shadow-md p-10 max-w-3xl w-full">
        <div className="flex flex-col justify-center items-start">
          <h2 className="text-3xl font-medium text-black mb-4">Sign Up</h2>
          <p className="text-gray-600 mb-6">
            {" "}
            Enter your details below to create your account and start trading
          </p>
        </div>

        <form className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-500"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 p-2 block w-full rounded-md border-[1px] border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
              placeholder="Enter..."
            />
          </div>
          <div className="sm:col-span-3">
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
          <div className="sm:col-span-3 ">
            <label
              htmlFor="Date of Birth"
              className="block text-sm font-medium text-gray-500"
            >
              Date of Birth
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat={"dd/MM/yyyy"}
              className="mt-1 p-2 w-full block rounded-md border-[1px] border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
              placeholderText="MM/DD/YYYY"
              name="Date of Birth"
              id="Date of Birth"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-500"
            >
              Phone No
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="mt-1 p-2 block w-full rounded-md border-[1px] border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
              placeholder="1234567890"
            />
          </div>
          <div className="sm:col-span-3">
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
          <div className="sm:col-span-3">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-500"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
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
      </div>
    </div>
  );
};

export default SignupPage;
