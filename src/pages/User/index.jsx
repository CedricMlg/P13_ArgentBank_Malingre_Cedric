import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";
import logo from "../../assets/argentBankLogo.png"

export default function User() {
  // const { data, isLoading, error } = useQuery("users", async () => {
  //   const response = await axios.get("http://localhost:3001/api/v1/user/login");
  //   const data = response;
  //   return data;
  // });

  // if (error) {
  //   return <p>Il y a un problème</p>;
  // }

  // console.log(data);

  return (
    <div>
      {/* {isLoading ? (
        <p>Chargement des données</p>
      ) : ( */}
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
              <NavLink className="main-nav-item" to="/user">
                <i className="fa fa-user-circle"></i>
                Tony
              </NavLink>
              <NavLink className="main-nav-item" to="/">
                <i className="fa fa-sign-out"></i>
                Sign Out
              </NavLink>
            </div>
          </nav>
          <main className="main bg-dark">
            <div className="header">
              <h1>
                Welcome back
                <br />
                Tony Jarvis!
              </h1>
              <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">
                  Argent Bank Credit Card (x8349)
                </h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
          </main>
        </div>
      {/* )} */}
    </div>
  );
}
