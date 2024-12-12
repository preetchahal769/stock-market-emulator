import { ChartNoAxesCombined } from "lucide-react";
import React, { useState } from "react";

const VerifyOtp = () => {
  const [otpTime, setOtpTime] = useState(20);

  (function () {
    setTimeout(() => {
      setOtpTime(otpTime - 1);
      if (otpTime === 0) {
        return setOtpTime(0);
      }
    }, 1000);
  })();
  const disableButton = otpTime > 0;
  return (
    <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-xl shadow-md p-10 max-w-md w-full">
        <div className="flex flex-col justify-center items-start">
          <h2 className="text-3xl font-medium text-black mb-4">
            <ChartNoAxesCombined />
            Enter OTP
          </h2>
          <p className="text-gray-600 mb-6">
            {" "}
            Enter the OTP sent to your email . If you did not receive the email,
            please check your spam folder.or try again in {otpTime} sec
          </p>
        </div>

        <form
          className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6"
          //   onSubmit={handleSubmit}
        >
          <div className="sm:col-span-6">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-500"
            >
              OTP
            </label>
            <input
              type="text"
              id="Email"
              name="Email"
              //   value={data.email}
              //   onChange={(e) => setData({ ...data, email: e.target.value })}
              className="mt-1 p-2 block w-full rounded-md border-[1px] border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
              placeholder="123456"
            />
          </div>

          <div className="sm:col-span-6">
            <button
              type="submit"
              className="mt-1 p-2 block w-full rounded-md border-[1px] bg-indigo-500 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-lg"
            >
              Verify OTP
            </button>
          </div>
        </form>
        <div className="flex flex-row justify-center items-center mt-4">
          {" "}
          <button
            to="/signup"
            disabled={disableButton}
            className="  disabled:opacity-50   text-indigo-500 hover:text-indigo-800"
          >
            Send OTP Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
