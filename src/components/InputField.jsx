/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputField({
  register,
  errors,
  name,
  label,
  isPassword,
  isNumber,
  isRequired,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col">
      <Input
        isRequired={isRequired}
        label={label}
        {...register(name)}
        type={
          isPassword
            ? visible
              ? "text"
              : "password"
            : isNumber
            ? "number"
            : "text"
        }
        endContent={
          isPassword && (
            <button type="button" onClick={() => setVisible(!visible)}>
              {visible ? <FaEyeSlash /> : <FaEye />}
            </button>
          )
        }
      />
      {errors && (
        <p className="p-1 px-2 text-error text-md">{errors.message}</p>
      )}
    </div>
  );
}

export default InputField;
