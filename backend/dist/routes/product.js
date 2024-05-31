"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("../middleware/multer"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
router.post("/new", auth_1.requireSignIn, auth_1.isAdmin, multer_1.default, product_1.newProduct);
router.get("/all", product_1.getAllProductsWithFilter);
//router.get("latest", getLatestProducts)
router.get("/latest", product_1.getLatestProducts);
router.get("/categories", product_1.getAllCategories);
router.get("/all-products", product_1.getAllProducts);
router.get("/:id", product_1.getSingleProduct);
router.put("/:id", auth_1.requireSignIn, auth_1.isAdmin, multer_1.default, product_1.updateProduct);
router.delete("/:id", auth_1.requireSignIn, auth_1.isAdmin, product_1.deleteProduct);
exports.default = router;
