import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import axios from "axios";
import logo from "../../assets/argentBankLogo.png";
import * as storeActions from "../../features/StoreToken";

export default function SignIn() {
  const [CheckEmail, setCheckEmail] = useState("");
  const [CheckPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate } = useMutation(
    async () => {
      return await axios.post(`http://localhost:3001/api/v1/user/login`, {
        email: CheckEmail,
        password: CheckPassword,
      });
    },
    {
      onSuccess: (res) => {
        navigate("/user");
        dispatch(storeActions.store(res.data.body.token));
      },
      onError: (err) => {
        console.log(err.response?.data || err);
      },
    }
  );

  function CheckData(event) {
    event.preventDefault();
    try {
      mutate();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <nav className="main-nav">
        <NavLink className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          <NavLink className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                value={CheckEmail}
                onChange={(e) => setCheckEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={CheckPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" onClick={CheckData}>
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
