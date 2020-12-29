"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeProfilePhoto = exports.storeProductPhoto = void 0;
var multer_1 = __importDefault(require("multer"));
var uuidv4_1 = require("uuidv4");
var path_1 = __importDefault(require("path"));
var productStorage = multer_1.default.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, uuidv4_1.uuid() + path_1.default.extname(file.originalname));
    }
});
var profileStorage = multer_1.default.diskStorage({
    destination: 'profile',
    filename: function (req, file, cb) {
        cb(null, uuidv4_1.uuid() + path_1.default.extname(file.originalname));
    }
});
exports.storeProductPhoto = multer_1.default({ storage: productStorage });
exports.storeProfilePhoto = multer_1.default({ storage: profileStorage });
