import React, { useState } from "react";
import { replaceUnderScore } from "./FormFunctions";
import styles from "@/styles/Form.module.css";
import ComponentWrapper from "./ComponentWrapper";

function InputOccupation(props) {
  const {
    name,
    label,
    placeholder,
    value,
    setData,
    options,
    errors,
    setValue,
    customRegister,
  } = props;

  const [display, setDisplay] = useState(false);
  const [suggestions, setSuggestions] = useState([...options.sort()]);
  const [inputValue, setInputValue] = useState("");

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
        text: innerText,
      },
    }));

    setValue("occupation", innerText, {
      shouldValidate: true,
    });

    setDisplay(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setData((prevVal) => ({ ...prevVal, [name]: value }));
    setInputValue(value);

    setSuggestions(
      options.filter((suggestion) => {
        if (suggestion.toLowerCase().includes(value.toLowerCase())) {
          return suggestion;
        }
      })
    );

    if (!value) {
      setValue(name, "", true);
    }
  };

  const openSearch = () => {
    setDisplay(true);
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
            // onChange={handleChange}
            value={value}
            onClick={openSearch}
            // id={name}
            placeholder={placeholder}
            autoComplete="new-off"
          />
          {display ? (
            <div className="position-relative">
              <div className={styles.top_suggestion}>
                <input
                  type="text"
                  className="form-control"
                  value={inputValue}
                  onChange={handleChange}
                  autoFocus
                />
                <div className="position-relative">
                  <div className={styles.options}>
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
              </div>
            </div>
          ) : null}
        </div>
      </ComponentWrapper>
    </>
  );
}

export default InputOccupation;
