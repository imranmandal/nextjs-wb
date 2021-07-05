import { convertedHeight, convertedValue } from "./FormFunctions";

export default function Select(props) {
  const {
    label,
    placeholder,
    name,
    selected,
    setSelected,
    options,
    setValue,
    disabled,
    // customRegister,
    errors,
  } = props;

  const handleChange = (elem) => {
    const { value, name } = elem.target;
    setSelected((prevVal) => ({
      ...prevVal,
      [name]: value.includes("select") ? null : value,
    }));
    setValue(name, value.includes("select") ? null : value, {
      shouldValidate: true,
    });
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-between p-3 w-100">
        <div className="d-flex justify-content-between">
          <label className="my-auto" htmlFor={name}>
            {label}
          </label>
          <p className="error-message">{errors && errors[name]?.message}</p>
        </div>
        <select
          className="form-control w-100 text-capitalize"
          name={name}
          id={name}
          disabled={disabled}
          value={selected}
          onChange={(e) => {
            // customRegister && customRegister[name].onChange(e);
            handleChange(e);
          }}
          // ref={customRegister && customRegister[name].ref}
        >
          <option value="">Select {placeholder || name}</option>
          {name === "drink" || name === "smoke"
            ? options.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {convertedValue(option.text)}
                  </option>
                );
              })
            : name === "height"
            ? options.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {convertedHeight(option)}
                  </option>
                );
              })
            : options.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {name === "verificationDocName"
                      ? convertedValue(option)
                      : convertedValue(option).toLowerCase()}
                  </option>
                );
              })}
        </select>
      </div>
    </>
  );
}
