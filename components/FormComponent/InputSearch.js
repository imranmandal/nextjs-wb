import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Form.module.css";
import ComponentWrapper from "./ComponentWrapper";

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
  } = props;

  const [display, setDisplay] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [queryVariable, setQueryVariable] = useState({
    like: "",
    skip: 0,
    take: 100,
  });

  useEffect(() => {
    setQueryVariable((prevVal) => ({ ...prevVal, skip: 0 }));
  }, [queryVariable.like]);

  const handleClose = () => {
    setDisplay(true);
  };

  const handleSelect = (e) => {
    const value = e.target.getAttribute("data-value");
    const innerText = e.target.innerHTML;

    setData((prevVal) => ({
      ...prevVal,
      [name]: {
        id: value,
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
    setData((prevVal) => ({ ...prevVal, [name]: value }));
    searchSuggestion();
  };

  return (
    <>
      <div className="d-flex flex-column p-3 w-100">
        <ComponentWrapper setDisplayOptions={setDisplay}>
          <ClientOnly>
            <div className="d-flex justify-content-between">
              <label htmlFor={name}>{label}</label>
              <p className="error-message">{errors && errors[name]?.message}</p>
            </div>

            <input
              className="form-control w-100"
              type="text"
              name={name}
              onChange={handleChange}
              value={value.name}
              onClick={handleClose}
              id={name}
              placeholder={placeholder}
              autoComplete="new-off"
            />

            {display ? (
              <div className="inputSearchResult shadow-lg rounded position-relative">
                <div onScroll={handleScroll} className={styles.suggestion}>
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
            ) : null}
          </ClientOnly>
        </ComponentWrapper>
      </div>
    </>
  );
};

export default InputGql;
