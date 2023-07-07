import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

// import "./Header.css";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

const options = {
  burgerColorHover: "#eff30d",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eff30d",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eff30d",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIcon: true,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  ProfileIconElement: MdAccountCircle,
  searchIcon: true,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement: MdAddShoppingCart,
  profileIconColorHover: "#eff30d",
  searchIconColorHover: "#eff30d",
  cartIconColorHover: "#eff30d",
  cartIconMargin: "1vmax",
  link1AnimationTime: 0.5,
  link2AnimationTime: 0.75,
  link3AnimationTime: 1,
  link4AnimationTime: 1.25,
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
