import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Form.module.css";
import ComponentWrapper from "./ComponentWrapper";
import { FaLock } from "react-icons/fa";
import ClientOnly from "../ClientOnly";
const InputGql = (props) => {
  const {
    name,
    label,
    value,
    placeholder,
    setData,
    QUERY_NAME,
    OUTPUT_OBJ_NAME,
    setValue,
    errors,
    disabled,
  } = props;

  const [display, setDisplay] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [queryVariable, setQueryVariable] = useState({
    like: "",
    skip: 0,
    take: 100,
  });

  useEffect(() => {
    setQueryVariable((prevVal) => ({ ...prevVal, skip: 0 }));
  }, [queryVariable.like]);

  // const handleClose = () => {
  //   setDisplay(true);
  // };

  const handleSelect = (e) => {
    const value = e.target.getAttribute("data-value");
    const innerText = e.target.innerHTML;
    setInputValue("");
    setData((prevVal) => ({
      ...prevVal,
      [name]: {
        id: value || "",
        name: innerText,
      },
    }));

    setDisplay(false);
    setValue(name, innerText, {
      shouldValidate: true,
    });
  };

  const handleScroll = (e) => {
    let target = e.target;
    if (target.scrollHeight - target.scrollTop < 500) {
      setQueryVariable((prevValue) => ({
        ...prevValue,
        skip: prevValue.skip + 50,
      }));
      appendSuggestion();
    }
  };

  const Data = useQuery(QUERY_NAME, {
    variables: {
      like: queryVariable.like,
      skip: queryVariable.skip,
      take: queryVariable.take,
    },
  });

  const searchSuggestion = () => {
    if (Data.data) {
      if (name === "city") {
        return setSuggestions(() => [...Data.data[OUTPUT_OBJ_NAME].values]);
      }
      setSuggestions(() => [...Data.data[OUTPUT_OBJ_NAME]]);
    }
  };

  const appendSuggestion = () => {
    if (Data.data) {
      if (name === "city") {
        return setSuggestions((prevVal) => [
          ...prevVal,
          ...Data.data[OUTPUT_OBJ_NAME].values,
        ]);
      }
      setSuggestions((prevVal) => [...prevVal, ...Data.data[OUTPUT_OBJ_NAME]]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryVariable((prevVal) => ({ ...prevVal, like: value }));
    // setData((prevVal) => ({ ...prevVal, [name]: value }));
    setInputValue(value);
    searchSuggestion();

    if (name === "designation" || name === "employerName") {
      setData((prevVal) => ({
        ...prevVal,
        [name]: {
          id: 0,
          name: value,
        },
      }));

      setValue(name, value || "", true);
    }
  };

  const openSearch = () => {
    setDisplay(true);
  };

  return (
    <>
      <div className="d-flex flex-column p-3 w-100">
        <ComponentWrapper setDisplayOptions={setDisplay}>
          <ClientOnly>
            <div className="d-flex justify-content-between">
              <label htmlFor={name}>{label}</label>
              <p className="error-message">{errors && errors[name]?.message}</p>
              {disabled && (
                <span className="text-pink">
                  <FaLock />
                </span>
              )}
            </div>

            <input
              className="form-control w-100"
              type="text"
              name={name}
              defaultValue={disabled ? "" : value.name}
              onClick={openSearch}
              disabled={disabled}
              placeholder={placeholder}
            />

            {display ? (
              <div className="position-relative">
                <div className={styles.top_suggestion}>
                  <input
                    type="text"
                    name={name}
                    className="form-control"
                    value={inputValue}
                    onChange={handleChange}
                    autoFocus
                    autoComplete="new-off"
                  />

                  <div className="position-relative">
                    <div onScroll={handleScroll} className={styles.options}>
                      {suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => {
                          return (
                            <p
                              key={index}
                              onClick={handleSelect}
                              data-value={suggestion.id}
                            >
                              {name === "city"
                                ? suggestion.name +
                                  ", " +
                                  suggestion.state?.name +
                                  ", " +
                                  suggestion.state?.country.name
                                : suggestion.name}
                            </p>
                          );
                        })
                      ) : (
                        <p className={styles.options} value="">
                          No result
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* {showSearch ? (
              <div className="inputSearchResult shadow-lg rounded position-relative">
                <div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                  />
                  <div
                    onScroll={handleScroll}
                    className={styles.top_suggestion}
                  >
                    {suggestions.length > 0 ? (
                      suggestions.map((suggestion, index) => {
                        return (
                          <p
                            key={index}
                            onClick={handleSelect}
                            data-value={suggestion.id}
                          >
                            {suggestion.name}
                          </p>
                        );
                      })
                    ) : (
                      <p className={styles.suggestion} value="">
                        No result
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : null} */}
          </ClientOnly>
        </ComponentWrapper>
      </div>
    </>
  );
};

export default InputGql;
