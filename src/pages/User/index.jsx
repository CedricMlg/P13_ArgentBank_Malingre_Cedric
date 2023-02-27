import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/argentBankLogo.png";

export default function User() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [editName, setEditName] = useState(false);
  const [userFName, setUserFName] = useState();
  const [userLName, setUserLName] = useState();
  const localStore = localStorage.getItem("store");

  useEffect(() => {
    const store = JSON.parse(localStore);
    if (store === null) {
      navigate("/");
      window.location.reload();
    }
    const token = Object.values(store.token);
    async function getUserDataLoad() {
      const response = await axios.post(
        `http://localhost:3001/api/v1/user/profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token[0]}`,
          },
        }
      );
      const userData = response.data.body;
      setUserFName(userData.firstName);
      setUserLName(userData.lastName);
      setIsLoading(false);
    }

    getUserDataLoad();
  }, []);

  const { mutate } = useMutation(
    async () => {
      return await axios.put(
        `http://localhost:3001/api/v1/user/profile`,
        {
          firstName: `${userFName}`,
          lastName: `${userLName}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token[0]}`,
          },
        }
      );
    },
    {
      onError: (err) => {
        console.log(err.response?.data || err);
      },
    }
  );

  function SendData(event) {
    event.preventDefault();
    try {
      mutate();
    } catch (err) {
      console.log(err);
    }
    setEditName(false);
  }

  return (
    <div>
      {isLoading ? (
        <p>Chargement des données</p>
      ) : (
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
                {userFName}
              </NavLink>
              <NavLink className="main-nav-item" to="/">
                <i className="fa fa-sign-out"></i>
                Sign Out
              </NavLink>
            </div>
          </nav>
          <main className="main bg-dark">
            <div className="header">
              {editName ? (
                <div className="edit-name">
                  <h1>Welcome back</h1>
                  <div className="edit-form">
                    <input
                      placeholder={userFName}
                      type="text"
                      id="edit-FName"
                      onChange={(e) => setUserFName(e.target.value)}
                    />
                    <input
                      placeholder={userLName}
                      type="text"
                      id="edit-LName"
                      onChange={(e) => setUserLName(e.target.value)}
                    />
                  </div>
                  <div className="edit-buttons">
                    <button onClick={SendData}>Save</button>
                    <button onClick={() => setEditName(false)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="header">
                  <h1>
                    Welcome back
                    <br />
                    {userFName} {userLName}!
                  </h1>
                  <button
                    className="edit-button"
                    onClick={() => setEditName(true)}
                  >
                    Edit Name
                  </button>
                </div>
              )}
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
      )}
    </div>
  );
}
