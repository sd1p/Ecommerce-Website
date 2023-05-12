import React from "react";
import { Link } from "react-router-dom";
import ReactStarts from "react-rating-stars-component";
//#TODO: make ReactStars Responsive. (paritally complete)
const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStarts {...options} /> <span>(256 Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default Product;
