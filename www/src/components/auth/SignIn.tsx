import React from "react";
import BasicLayout from "../layout/BasicLayout";
import Title from "../form/Title";
import FormInput from "../form/FormInput";

const SignIn = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <BasicLayout>
        <form action="" className="bg-secondary rounded p-6 w-96 space-y-5">
          <Title>Sign in</Title>
          <FormInput name="email" label="Email" placeholder="john@email.com" />
        </form>
      </BasicLayout>
    </div>
  );
};

export default SignIn;
