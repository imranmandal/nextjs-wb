import { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "@/styles/Form.module.css";
import { convertedValue, replaceUnderScore } from "./FormFunctions";
import ComponentWrapper from "./ComponentWrapper";

const MultipleSelect = ({
  name,
  value,
  setData,
  label,
  options,
  setValue, // React-Hook-Form hook
  errors,
}) => {
  const [displayOptions, setDisplayOptions] = useState(false);

  useEffect(() => {
    var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    var wordLength =
      width > 768 ? Math.floor(width / 30) : Math.floor(width / 10);

    if (value?.innerValue?.length > 0) {
      const selected = value?.innerValue.map((val) => replaceUnderScore(val));
      const joined = selected.join(", ");
      const sliced =
        joined.length > wordLength
          ? joined.slice(0, wordLength) + " ..."
          : joined;
      document.getElementById(name + "-selected").innerHTML =
        sliced.toLocaleLowerCase();

      setValue(name, value?.innerValue.join(" "), { shouldValidate: true });
    } else {
      document.getElementById(name + "-selected").innerHTML = "Select";
      setValue(name, "");
    }
  }, [value]);

  // -------- HANDLE CHANGE
  const handleChange = (e) => {
    const { checked } = e.target;
    const value = e.target.getAttribute("data-value");

    if (checked) {
      if (value !== "NONE") {
        setData((prevValue) => ({
          ...prevValue,
          [name]: {
            innerValue: [
              ...prevValue[name]?.innerValue?.filter((val) => {
                return val !== "NONE";
              }),
              convertedValue(value),
            ],
            value: [
              ...prevValue[name]?.value?.filter((val) => {
                return val !== "NONE";
              }),
              value,
            ],
          },
        }));
      } else {
        setData((prevValue) => ({
          ...prevValue,
          [name]: {
            innerValue: [convertedValue(value)],
            value: [value],
          },
        }));
      }
    }
    if (!checked) {
      setData((prevValue) => ({
        ...prevValue,
        [name]: {
          innerValue: [
            ...prevValue[name]?.innerValue?.filter((val) => {
              return val !== convertedValue(value);
            }),
          ],
          value: [
            ...prevValue[name]?.value?.filter((val) => {
              return val !== value;
            }),
          ],
        },
      }));
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setDisplayOptions((prevValue) => !prevValue);
  };

  return (
    <>
      <ComponentWrapper setDisplayOptions={setDisplayOptions}>
        <div className="d-flex flex-column p-3 w-100">
          <div className="d-flex justify-content-between">
            <label className="my-auto" htmlFor={name + "-selected"}>
              {label}
            </label>
            <p className="error-message">{errors && errors[name]?.message}</p>
          </div>
          <Select onClick={handleClick}>
            <p id={name + "-selected"} className="m-0"></p>
          </Select>
          <div className="position-relative shadow-lg rounded w-100">
            <div className={styles.suggestion}>
              {displayOptions ? (
                <>
                  <Button onClick={handleClick}>Done</Button>

                  {options.map((option, index) => {
                    return (
                      <div key={index} className="d-flex">
                        <input
                          id={option + name}
                          type="checkbox"
                          name={option + "-s"}
                          data-value={option}
                          onChange={handleChange}
                          className="my-auto"
                          checked={
                            value?.value?.length > 0 &&
                            value.value.includes(option)
                              ? true
                              : false
                          }
                        />{" "}
                        <label
                          className="w-100 my-auto mx-2 p-1"
                          htmlFor={option + name}
                        >
                          {name === "degrees"
                            ? convertedValue(option)
                            : convertedValue(option).toLocaleLowerCase()}
                        </label>
                      </div>
                    );
                  })}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </>
  );
};

const Select = styled.div`
  color: #000;
  background-color: #fff;
  border: 1px solid #e11c74;
  border-radius: 5px;
  padding: 6px 10px;
  margin: 0 !important;
  width: 100%;
  overflow: hidden;
`;

const Button = styled.button`
  position: absolute;
  right: 5px;
  text-align: right;
  background: none;
  color: #e11c74;
  border: none;
  padding: 5px 5px 0;
`;

export default MultipleSelect;
