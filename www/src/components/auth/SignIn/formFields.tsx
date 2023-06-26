import FormInput from "../../form/FormInput";

const formFields = [
  {
    name: "email",
    placeholder: "email@email.com",
    label: "Email",
    type: "text",
  },
  {
    name: "password",
    placeholder: "*********",
    label: "Password",
    type: "password",
  },
];

const renderFormFields = () => formFields.map((el) => <FormInput {...el} />);

export default renderFormFields;
