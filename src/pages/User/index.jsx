import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { NavLink } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/argentBankLogo.png";

export default function User() {
  const [isLoading, setIsLoading] = useState(true);
  const [editName, setEditName] = useState(false);
  const [userFName, setUserFName] = useState();
  const [userLName, setUserLName] = useState();
  const localStore = localStorage.getItem("store");
  const store = JSON.parse(localStore);
  const token = Object.values(store.token);

  useEffect(() => {
    /**
     * I'm using axios to make a post request to my backend server, and then I'm setting the state of
     * my React app to the data I get back from the server.
     */
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

  /* It's a mutation hook that I'm using to make a put request to my backend server. */
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

  /**
   * "SendData" is a function that takes an event as an argument and prevents the default action of the
   * event. Then, it tries to call the mutate function. If it fails, it logs the error. Finally, it
   * sets the state of editName to false.
   */
  function SendData(event) {
    event.preventDefault();
    try {
      mutate();
    } catch (err) {
      console.log(err);
    }
    setEditName(false);
  }

/**
 * It's a function that makes a post request to the server, and then sets the state of the component to
 * the data that was returned from the server.
 */
  async function CancelData(event) {
    event.preventDefault();
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
                    <button onClick={CancelData}>Cancel</button>
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
