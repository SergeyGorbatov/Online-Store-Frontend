import { FC } from "react";
import { InputProps } from "./types";
import "./style.scss";

const Input: FC<InputProps> = ({
  placeholder,
  nameInput,
  register,
  type,
  id,
  errors,
}) => {
  return (
    <>
      <div className="input-container">
        <input
          type={type}
          id={id}
          className="input"
          placeholder=" "
          {...register(nameInput)}
        />
        <label htmlFor={id} className="label">
          {placeholder}
        </label>
      </div>
      <div className="form__errors">{errors[nameInput]?.message}</div>
    </>
  );
};

export default Input;
