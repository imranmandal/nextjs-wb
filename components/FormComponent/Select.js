import React, { useState } from "react";
import { convertedHeight, replaceUnderScore } from "../SignUp/Data&Funct";

export default function Select(props) {
  const {
    label,
    placeholder,
    name,
    setSelected,
    options,
    customRegister,
    errors,
  } = props;
  const [suggestions, setSuggestions] = useState(options);

  // Converting income
  String.prototype.allReplace = function (obj) {
    var retStr = this;
    for (var x in obj) {
      retStr = retStr.replace(new RegExp(x, "g"), obj[x]);
    }
    return retStr;
  };

  const convertedValue = (valueInString) => {
    if (!valueInString) {
      return;
    }
    const convertedVal = valueInString.allReplace({
      DASH: "-",
      slash: "/",
      _TO: " -",
      _or: " /",
      ONE_: "1 ",
      TWO: "2",
      SEVENTY_FIVE: "75",
      THIRTY_FIVE: "35",
      FIVE: "5",
      TEN: "10",
      TWENTY: "20",
      THIRTY: "30",
      FIFTY: "50",
    });

    return replaceUnderScore(convertedVal);
  };

  const handleChange = (elem) => {
    const { value, name } = elem.target;
    setSelected((prevVal) => ({
      ...prevVal,
      [name]: value.includes("select") ? null : value,
    }));
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
          // value={selected}
          onChange={(e) => {
            customRegister[name].onChange(e);
            handleChange(e);
          }}
          ref={customRegister[name].ref}
        >
          <option value="">Select {placeholder || name}</option>
          {name === "drink" || name === "smoke"
            ? suggestions.map((suggestion, index) => {
                return (
                  <option key={index} value={suggestion.value}>
                    {convertedValue(suggestion.text)}
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
