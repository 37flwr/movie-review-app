import React from "react";
import BasicLayout from "../../layout/BasicLayout";
import Title from "../../form/Title";
import renderFormFields from "./formFields";
import Submit from "../../form/Submit";

const SignIn = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <BasicLayout>
        <form action="" className="bg-secondary rounded p-6 w-96 space-y-5">
          <Title>Sign in</Title>
          {renderFormFields()}
          <Submit value="Sign in" />

          <div className="flex justify-between">
            <a
              className="text-dark-subtle hover:text-white transition"
              href="#"
            >
              Forget Password
            </a>
            <a
              className="text-dark-subtle hover:text-white transition"
              href="#"
            >
              Sign up
            </a>
          </div>
        </form>
      </BasicLayout>
    </div>
  );
};

export default SignIn;
