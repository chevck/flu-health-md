import React from "react";
import "./login.scss";

export const Login = () => {
  return (
    <div className="login_container">
      <div className="login_container_input-container">
        <div className="row">
          <label>Username</label>
          <input className="form-control" type="string" />
        </div>
        <div className="row">
          <label>Password</label>
          <input className="form-control" type="password" />
        </div>
        <div className="row">
          <button>Access System</button>
        </div>
      </div>
    </div>
  );
};
