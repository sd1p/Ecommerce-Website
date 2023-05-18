import React, { useEffect } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProdctCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import { Pagination, Box } from "@mui/material";
import { useState } from "react";

//component for /product page
const Products = () => {
  //using redux functions
  const dispatch = useDispatch();
  const { loading, error, products, resultPerPage, productFilterCount } =
    useSelector((state) => state.products);

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  //getting products for dependencies search keyword and current page.
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  //getting count of pages required to show all filtered porducts.
  const count = Math.ceil(productFilterCount / resultPerPage);
  const handleChange = (e, page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProdctCard key={product._id} product={product} />
              ))}
          </div>
          {count > 1 ? (
            //using MUI for centering pagination component.
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
