import React from "react";
import { NavLink } from "react-router-dom";
import "./VerticalNavbar.css";

const VerticalNavbar = () => {
  return (
    <div className="vertical-navbar">
      <h2 className="navbar-logo">My Store</h2>
      <ul className="navbar-menu">
        <li>
          <NavLink to="/category" activeClassName="active">
            Category
          </NavLink>
        </li>
        <li>
          <NavLink to="/product" activeClassName="active">
            Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default VerticalNavbar;
