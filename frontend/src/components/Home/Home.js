import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
const productT = {
  name: "Blue Shirt",
  images: [
    {
      url: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
  ],
  price: "₹2000",
  _id: "random",
};

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <Fragment>
      <MetaData title="ECOM" />
      <div className="banner">
        <p>Welcome To ECOM</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products && products.map((product) => <Product product={product} />)}
        <Product product={productT} />
      </div>
    </Fragment>
  );
};

export default Home;