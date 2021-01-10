import {Request, Response} from "express";
import Product from "../models/Product";

const createProduct = async (req: Request, res: Response) => {
  const {name, category, price, imgURL} = req.body;

  console.log(name, category, price, imgURL);

  const newProduct = await new Product({name, category, price, imgURL}).save();

  return res.status(201).json(newProduct);
};

const getProducts = async (_: Request, res: Response) => {
  const products = await Product.find();

  return res.status(200).json(products);
};

const getProductbyId = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.productId);

  res.status(200).json(product);
};

const updateProductbyId = async (req: Request, res: Response) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {new: true} // this is for mongoose to return the new updated product
  );

  return res.status(200).json(updatedProduct);
};

const deleteProductbyId = (_: Request, res: Response) => {
  return res.json("deleteProductbyId");
};

export default {
  createProduct,
  getProducts,
  getProductbyId,
  updateProductbyId,
  deleteProductbyId,
};
