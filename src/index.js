import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Scout from "./pages/Scout";
import About from "./pages/About";
import Analysis from "./pages/Analysis";
import Team from "./pages/Team";
import Admin from "./pages/Admin";
import Averages from "./pages/Averages";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/*<Route path="/admin" element={<Admin />} />*/}
      <Route path="/index" element={<Home />} />
      <Route path="/login/:redirect" element={<Login />} />
      <Route path="/scout" element={<Scout />} />
      <Route path="/about" element={<About />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/team/:team" element={<Team />} />
      <Route path="/averages" element={<Averages />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);
