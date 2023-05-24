const { json } = require("express");

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    //console.log(keyword);
    return this;
  }

  filter() {
    const queryFilter = { ...this.queryStr };

    //removing some queries for category.
    const toRemove = ["keyword", "page", "limit"];
    toRemove.forEach((element) => {
      delete queryFilter[element];
    });

    //filter for price and rating
    let queryTemp = JSON.stringify(queryFilter);
    queryTemp = queryTemp.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    queryTemp = JSON.parse(queryTemp);
    //console.log(queryTemp);
    this.query = this.query.find(queryTemp);
    this.count = this.query.countDocuments();
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = (currentPage - 1) * resultPerPage;
    this.query = this.query.find().limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
