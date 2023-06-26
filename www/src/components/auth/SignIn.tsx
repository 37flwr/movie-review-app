import React from "react";
import BasicLayout from "../layout/BasicLayout";

const SignIn = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <BasicLayout>
        <form action="" className="bg-secondary rounded p-6 w-96">
          <h1 className="text-xl text-white font-semibold text-center">
            Sign in
          </h1>
          <div className="flex flex-col-reverse">
            <input
              type="text"
              id="email"
              className="bg-transparent rounded border-2 border-dark-subtle w-full text-lg outline-none focus:border-white p-1 text-white peer transition"
              placeholder="john@email.com"
            />
            <label
              htmlFor="email"
              className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
            >
              Email
            </label>
          </div>
        </form>
      </BasicLayout>
    </div>
  );
};

export default SignIn;
