const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandeler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//Create Product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Updating a product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    success: true,
    product,
  });
});

//Delete product --Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
  }

  //await product.remove() changed to Product.deleteOne()
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Product deleted Successfully",
  });
});

//Get All Products with API Features i.e search, filter, pagination.
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5; //pagination constant (can be modified as per need)
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product, req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

//Get Product Details for one product with _id.
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

//Creating a new review of updating the existing review.
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.user = req.user._id;
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((review) => {
    avg += review.rating;
  });

  product.rating = avg / product.reviews.length;
  await product.save({ validatorBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Getting all reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Deleting Review (admin) can delete any review
exports.deleteProductReviewsAdmin = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.reviewId.toString()
  );
  let total = 0;
  reviews.forEach((review) => {
    total += review.rating;
  });
  const rating = total / reviews.length || 0;
  const numOfReviews = reviews.length || 0;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});

//Deleting Review (user) can delete own review
exports.deleteProductReviewsUser = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  //filter by review id.
  // const reviews = product.reviews.filter(
  //   (review) => review._id.toString() !== req.query.reviewId.toString()
  // );
  const reviews = product.reviews.filter(
    (review) => review.user.toString() !== req.user._id.toString()
  );
  let total = 0;
  reviews.forEach((review) => {
    total += review.rating;
  });
  const rating = total / reviews.length || 0;
  const numOfReviews = reviews.length || 0;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
