const express = require("express");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  getMyOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder);
router
  .route("/order/:id")
  .post(isAuthenticated, authorizedRoles("admin"), getSingleOrder);
router.route("/order/me").get(isAuthenticated, getMyOrders);
router
  .route("/admin/orders")
  .get(isAuthenticated, authorizedRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteOrder);
module.exports = router;
