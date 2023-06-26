import { type FC } from "react";

interface IFormInput {
  name: string;
  placeholder: string;
  label: string;
  type?: string;
}

const FormInput: FC<IFormInput> = ({ name, placeholder, label, ...rest }) => (
  <div className="flex flex-col-reverse">
    <input
      id={name}
      name={name}
      className="bg-transparent rounded border-2 border-dark-subtle w-full text-lg outline-none focus:border-white p-1 text-white peer transition"
      placeholder={placeholder}
      {...rest}
    />
    <label
      htmlFor={name}
      className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
    >
      {label}
    </label>
  </div>
);

export default FormInput;
