import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import categoryModel from "../models/categoryModel.js";
import { query } from "express";

cloudinary.config({
  cloud_name: "duogkpk5c",
  api_key: "256893742567797",
  api_secret: "3cy3nunfV8IG4KHI4IaXbpnYxdc",
});

const getCategory = async (slug) => {
  const category = await categoryModel.findOne({ slug });
  return category;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      discount,
      MRP,
      rating,
      company,
    } = req.body;
    const photo = req.file.path;

    // Validations
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !rating ||
      !MRP ||
      !company
    ) {
      return res.status(500).send({ message: "All fields are required" });
    }

    if (!photo && !photo.path) {
      return res
        .status(500)
        .send({ message: "Photo is required and should be less than 1 MB" });
    }
    const categoryDoc = await getCategory(category);
    const cloudinaryUpload = await cloudinary.uploader.upload(
      photo,
      (err, res) => {
        if (err) {
          res
            .status(500)
            .send({ message: "Error in uploading image to cloudinary" });
        }
      }
    );
    const products = new productModel({
      name,
      description,
      price,
      category: categoryDoc._id,
      categoryName: category,
      quantity,

      MRP,
      rating,
      company,
      slug: slugify(name.toLowerCase()),
      photo: cloudinaryUpload.url,
      deliverIn: getRandomInt(1, 7),
    });
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      // .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      total_count: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product",
      error: error.message,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })

      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

//get-photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product successfully with id : " + req.params.pid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update product controller//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo && photo.size > 10000000 && !photo.path:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    let products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      if (products.photo.data) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      } else {
        res.send({
          error: "error",
        });
      }
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

export const getProductByCategory = async (req, res) => {
  const products = await productModel.find({
    categoryName: req.params.category,
  });

  if (products) {
    res.status(200).send({
      success: true,
      products: products,
      message: "Product fetched by category successfully",
      total_count: products.length,
    });
  } else {
    res.status(500).send({
      success: false,
      message: "Error while fetching product through category",
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { query } = req.params;

    const data = await productModel.find({
      slug: { $regex: ".*" + query + ".*", $options: "i" },
    });
    if (data.length == 0) {
      res.status(200).send({
        success: false,
        message: "No product found for that query",
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: "Products Found ",
      total_count: data.length,
      results: data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
