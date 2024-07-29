import express from "express";
import { createProducts, getProducts, updateProduct, deleteProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts)

//when ever you want to create something use post method. 
router.post("/", createProducts);

// put or patch is for updating the product 
router.put("/:id", updateProduct);

router.delete("/:id", deleteProducts);

export default router; 