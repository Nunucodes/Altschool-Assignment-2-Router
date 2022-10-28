import React from "react";
import Home from "../Home/home";
import User from "../User/user";
import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
} from "react-router-dom";
import "./navbar.css";
import PageNotFound from "../Error/404";

const NavBar = () => {
  // if(true) {
  //     throw new Error('error')
  // }
  return (
    <Router>
      <header>
        <div className="nav">
          <ul className="navigation_items">
            <li>
              <NavLink to="/">Home </NavLink>
            </li>
            <li>
              <NavLink to="/users/page/1">User</NavLink>
            </li>
          </ul>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/users/page/:page" element={<User />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default NavBar;
