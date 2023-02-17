import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/main.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn"
import User from "./pages/User";
import Footer from "./components/Footer";
const container = document.getElementById("root");
const root = createRoot(container);
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

/* Rendering the React app to the DOM. */
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/user" element={<User />} />
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
