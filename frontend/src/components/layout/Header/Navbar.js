import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/logo.png";

import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserOptions from "./UserOptions";
import { Backdrop } from "@material-ui/core";

const Navbar = ({ user, auth }) => {
  const [keyword, setKeyword] = useState(" ");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  const location = useLocation().pathname;

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="nav-left">
          <Link to={"/"}>
            <img className="logo-img" src={logo} alt="" />
          </Link>
          <Link className="nav-pages" to={"/products"}>
            Products
          </Link>
          <Link className="nav-pages" to={"/contact"}>
            Contact
          </Link>
          <Link className="nav-pages" to={"/about"}>
            About
          </Link>
        </div>

        {console.log(location === "/search" ? "hidden" : "")}
        <div className={`nav-middle ${location === "/search" ? "hidden" : ""}`}>
          {/* <Link to={"/search"} className="search-bar">
            <input className="search-inp" type="text" placeholder=" Search" />
            <MdSearch size={"44px"} className=" search-icon" />
          </Link> */}

          <form className="search-form" onSubmit={searchSubmitHandler}>
            <input
              className="search-inp"
              type="text"
              placeholder=" Search a Product ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              className="search-icon"
              type="submit"
              name="submit"
              style={{ outline: "none" }}
            >
              <MdSearch size={"38px"} className="" />
            </button>
          </form>
        </div>
        <div className="nav-right">
          <Link to={"/cart"}>
            <MdAddShoppingCart size={"5vh"} className="icon" />
          </Link>
          <Link to={"/login"}>
            {auth ? (
              <UserOptions user={user} />
            ) : (
              <MdAccountCircle size={"5vh"} className="icon" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
