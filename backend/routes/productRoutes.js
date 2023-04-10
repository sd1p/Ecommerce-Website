const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteProductReviewsUser,
  deleteProductReviewsAdmin,
} = require("../controllers/productController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticated, authorizedRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

//review routes
router.route("/product/review").post(isAuthenticated, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, deleteProductReviewsUser);
router
  .route("/admin/delete-review")
  .delete(isAuthenticated, authorizedRoles("admin"), deleteProductReviewsAdmin);
module.exports = router;
