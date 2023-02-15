import React from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/main.css'
import Home from './pages/Home';
import Footer from './components/Footer';
const container = document.getElementById("root");
const root = createRoot(container);

/* Rendering the React app to the DOM. */
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);