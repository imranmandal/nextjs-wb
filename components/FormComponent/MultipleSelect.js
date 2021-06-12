import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import styles from "@/styles/Form.module.css";
import { replaceUnderScore } from "../SignUp/Data&Funct";

const MultipleSelect = ({
  name,
  value,
  data,
  setData,
  label,
  options,
  setValue, // React-Hook-Form hook
  refs,
  errors,
}) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  // const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (value?.length > 0) {
      const selected = value.map((val) => replaceUnderScore(val));
      const joined = selected.join(", ");
      const sliced = joined.length > 35 ? joined.slice(0, 35) + " ..." : joined;
      document.getElementById(name + "-selected").innerHTML =
        sliced.toLocaleLowerCase();
    } else {
      document.getElementById(name + "-selected").innerHTML = "Select";
    }
  }, [value]);

  // useEffect(() => {
  //   if (data[name]) {
  //     setValue([name], value);
  //   } else {
  //     setValue([name], null);
  //   }
  // }, [data[name]]);

  // useEffect(() => {
  //   if (errors) {
  //     if (value?.length <= 0) {
  //       setShowErrors(true);
  //     } else {
  //       setShowErrors(false);
  //     }
  //   }
  // });

  const handleChange = (e) => {
    const { checked } = e.target;
    const value = e.target.getAttribute("data-value");

    if (checked) {
      if (value !== "NONE") {
        setData((prevValue) => ({
          ...prevValue,
          [name]: [
            ...prevValue[name].filter((val) => {
              return val !== "NONE";
            }),
            value,
          ],
        }));
      } else {
        setData((prevValue) => ({
          ...prevValue,
          [name]: [value],
        }));
      }
    }
    if (!checked) {
      // setValue([name], null);
      setData((prevValue) => ({
        ...prevValue,
        [name]: [
          ...prevValue[name].filter((val) => {
            return val !== value;
          }),
        ],
      }));
    }

    setValue(name, value, true);
  };

  const handleClick = (e) => {
    e.preventDefault();

    setDisplayOptions((prevValue) => !prevValue);
  };

  return (
    <>
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
                    <div key={index} className="d-flex p-3">
                      <input
                        id={option + name}
                        type="checkbox"
                        name={option + "-s"}
                        data-value={option}
                        onChange={handleChange}
                        className="my-auto"
                        checked={
                          value?.length > 0 && value.includes(option)
                            ? true
                            : false
                        }
                      />{" "}
                      <label
                        className="w-100 my-auto mx-2"
                        htmlFor={option + name}
                      >
                        {replaceUnderScore(option).toLocaleLowerCase()}
                      </label>
                    </div>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
      </div>
      {/* <input type="text" ref={refs} /> */}
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
