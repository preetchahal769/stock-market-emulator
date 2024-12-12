import { useState } from "react";
import DatePicker from "react-datepicker";
import { ChartNoAxesCombined } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const SignupPage = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const { signup } = useUserStore();

  // const [startDate, setStartDate] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signup(data);
      setData({
        fullName: "",
        email: "",
        dateOfBirth: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-xl shadow-md p-10 max-w-3xl w-full">
        <div className="flex flex-col justify-center items-start">
          <h2 className="text-3xl font-medium text-black mb-4">
            <ChartNoAxesCombined />
            Sign Up
          </h2>
          <p className="text-gray-600 mb-6">
            {" "}
            Enter your details below to create your account and start trading
          </p>
        </div>

        <form
          className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6"
          onSubmit={handleSubmit}
        >
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
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
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
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
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
              selected={data.dateOfBirth}
              onChange={(date) => setData({ ...data, dateOfBirth: date })}
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
              value={data.phoneNumber}
              onChange={(e) =>
                setData({ ...data, phoneNumber: e.target.value })
              }
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
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
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
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
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
          <Link to="/login" className="text-indigo-500 hover:text-indigo-800">
            Already have an account ? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
