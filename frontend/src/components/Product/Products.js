import React, { useEffect } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProdctCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import { Pagination, Box, Typography, Slider } from "@mui/material";
import { useState } from "react";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

//categories
const categories = [
  "Laptop",
  "Footware",
  "Bottoms",
  "Tops",
  "Attires",
  "Camera",
  "Smartphones",
];
//component for /product page
const Products = () => {
  //using redux functions
  const dispatch = useDispatch();
  const { loading, error, products, resultPerPage, productFilterCount } =
    useSelector((state) => state.products);

  const { keyword } = useParams();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  //getting products for dependencies search keyword and current page.
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating, alert, error]);

  //getting count of pages required to show all filtered porducts.
  const count = Math.ceil(productFilterCount / resultPerPage);
  const handleChange = (e, page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <MetaData title={"PRODUCTS ECOM"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products.length > 0 ? (
              products.map((product) => (
                <ProdctCard key={product._id} product={product} />
              ))
            ) : (
              <div className="blank">No Products Found. . .</div>
            )}
          </div>

          <div className="filterBox">
            <div>Price</div>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="ranged-slider"
              min={0}
              max={25000}
              size="small"
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="categoryLink"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, rating) => setRating(rating)}
                aria-labelledby="continous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              ></Slider>
            </fieldset>
          </div>

          {count > 1 ? (
            //if pages are more than 1 then using MUI for centering pagination component.
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
            >
              <Pagination
                count={count}
                color="primary"
                page={currentPage}
                onChange={handleChange}
              />
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Products;
