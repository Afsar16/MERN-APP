import Product from "../models/product.model.js"; // .js is important else it wont run 
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // empty object means fetch all products from the db
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log("error in fetching products: ", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const createProducts = async (req, res) => {
    const product = req.body // user will send this data 

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false , message: "please provide all feilds"})
    }
    const newProduct = new Product(product)

    try {   
        await newProduct.save(); // this will save it in database
        res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        console.error("Error in Create Product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params; // get the id from the url - ie, from params
    const product = req.body; // get the object to update 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product ID"})
    }
    try {
        const updatedProduct  = await Product.findByIdAndUpdate(id, product, {new: true}) // new: true gives the updated object else by default it will give the old object after updation 
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(404).json({success: false, message: "Server Error"})        
    }
}

export const deleteProducts = async (req, res) => {
    const {id} = req.params;
    // console.log("id: ", id)
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        console.log('Error in deleting products', error.message)
        res.status(404).json({success: false, message: "Product not found"})
    }
}