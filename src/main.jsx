import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./store";
import "./css/main.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import Footer from "./components/Footer";
const container = document.getElementById("root");
const root = createRoot(container);

const queryClient = new QueryClient();

/* Rendering the app. */
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/sign-in" element={<SignIn />} />
            <Route exact path="/user" element={<User />} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
