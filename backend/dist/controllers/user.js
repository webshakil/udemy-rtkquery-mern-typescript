"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (req, res) => {
    res.json({ status: 'ok', message: "This is register route" });
};
exports.register = register;
