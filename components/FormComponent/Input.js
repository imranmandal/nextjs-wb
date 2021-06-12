import React from "react";

export default function Input(props) {
  const { label, name, placeholder, type, value, setValue } = props;
  const handleChange = (elem) => {
    const { name, value } = elem.target;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-between p-3 w-100">
        <label className="my-auto" htmlFor={name}>
          {label}
        </label>
        <input
          className="form-control w-100"
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={handleChange}
          id={name}
          name={name}
          autoComplete="new-off"
        />
      </div>
    </>
  );
}
