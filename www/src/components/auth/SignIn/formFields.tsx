import FormInput from "../../form/FormInput";

const formFields = [
  {
    name: "email",
    placeholder: "email@email.com",
    label: "Email",
    type: "text",
  },
];

const renderFormFields = () => {
  return formFields.map((el) => <FormInput {...el} />);
};

export default renderFormFields;
