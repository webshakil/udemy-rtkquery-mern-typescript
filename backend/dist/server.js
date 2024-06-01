"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./routes/user"));
const product_1 = __importDefault(require("./routes/product"));
const order_1 = __importDefault(require("./routes/order"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const mongoConnectUri = (0, connectDB_1.default)();
mongoose_1.default.connect(mongoConnectUri)
    .then(() => {
    console.log("Mongodb Connection established");
})
    .catch(error => {
    console.error("Error connecting to MongoDB", error);
});
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/server-health", (req, res) => {
    res.status(200).json({
        success: "Ok",
        message: "Server health is fine"
    });
});
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/product", product_1.default);
app.use("/api/v1/order", order_1.default);
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
