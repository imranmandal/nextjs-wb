import React from "react";
import styles from "@/styles/Signup.module.css";

const Login = ({ setSlideClass }) => {
  return (
    <>
      <div className="container my-4 mx-auto text-left">
        <div className="col mx-auto my-5 text-capitalize">
          <form className={styles.login} action="#">
            <h2 className="text-center p-3 text-pink">Sign in</h2>

            <div className="my-3 mx-1 mx-sm-3 ">
              <div className="d-flex flex-column my-2 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                />
                {/* <p className="error-message">{errors.otp?.message}</p> */}
              </div>

              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <div className="d-flex flex-column">
                <a href="#">
                  Forgot <span className="text-lowercase">your password?</span>
                </a>
                <input
                  type="submit"
                  value="Sign In"
                  className="btn btn-pink w-100 "
                >
                  {/* <span className={styles.submitBtn}>Sign In</span> */}
                </input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
