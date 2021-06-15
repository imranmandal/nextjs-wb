import React, { useState } from "react";
import { replaceUnderScore } from "./FormFunctions";
import styles from "@/styles/Form.module.css";
import ComponentWrapper from "./ComponentWrapper";

function InputOccupation(props) {
  const {
    name,
    label,
    placeholder,
    setData,
    options,
    errors,
    setValue,
    customRegister,
  } = props;

  const [display, setDisplay] = useState(false);
  const [suggestions, setSuggestions] = useState([...options.sort()]);

  const replaceSpecialChar = (option) => {
    const withoutUnderScore = replaceUnderScore(option);
    return withoutUnderScore.replace("dash", "-");
  };

  const handleClose = () => {
    setDisplay(true);
  };

  const handleSelect = (e) => {
    const value = e.target.getAttribute("data-value");
    const innerText = e.target.innerHTML;
    setData((prevVal) => ({
      ...prevVal,
      [name]: {
        value: value,
        name: innerText,
      },
    }));
    setValue(name, innerText, {
      shouldValidate: true,
    });
    setDisplay(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevVal) => ({ ...prevVal, [name]: value }));
    setSuggestions(
      options.filter((suggestion) => {
        if (suggestion.toLowerCase().includes(value.toLowerCase())) {
          return suggestion;
        }
      })
    );
  };

  return (
    <>
      <ComponentWrapper setDisplayOptions={setDisplay}>
        <div className="d-flex flex-column justify-content-between p-3 w-100">
          <div className="d-flex justify-content-between">
            <label htmlFor={name}>{label}</label>
            <p className="error-message">{errors && errors[name]?.message}</p>
          </div>
          <input
            className="form-control w-100"
            type="text"
            name={name}
            onChange={(e) => {
              customRegister[name].onChange(e);
              handleChange(e);
            }}
            ref={customRegister[name].ref}
            onClick={handleClose}
            id={name}
            placeholder={placeholder}
            autoComplete="new-off"
          />
          {display ? (
            <div className="inputSearchResult shadow-lg rounded position-relative">
              <div className={styles.suggestion}>
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => {
                    return (
                      <p
                        key={index}
                        className="suggestion"
                        onClick={handleSelect}
                        data-value={suggestion}
                      >
                        {replaceSpecialChar(suggestion)}
                      </p>
                    );
                  })
                ) : (
                  <p className="suggestion text-secondary" value="">
                    No result
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </ComponentWrapper>
    </>
  );
}

export default InputOccupation;
