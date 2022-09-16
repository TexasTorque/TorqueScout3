import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import { default as Home } from "./pages/Home";
import { default as Login } from "./pages/Login";
import { default as NotFound } from "./pages/NotFound";
import { default as Scout } from "./pages/Scout";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/index" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/scout" element={<Scout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

// serviceWorker.unregister();
