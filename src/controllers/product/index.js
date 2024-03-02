import ProductModel from "../../models/product.js";
import Boom from "boom";
import ProductSchema from "./validations.js";
import { multipleImageUpload } from "../../helpers/s3.js";

const CreateWithS3 = async (req, res, next) => {
    const input = req.body;
    const images = req.files;
    const { error } = ProductSchema.validate(input);

    if (error) {
        return next(Boom.badRequest(error.details[0].message));
    }

    try {
        const locations = await multipleImageUpload(images);

        const product = new ProductModel({
            title: input.title,
            description: input.description,
            price: input.price,
            images: [...locations],
        });
        const savedData = await product.save();
        res.json(savedData);
    } catch (e) {
        next(e);
    }
};

const Create = async (req, res, next) => {
    const input = req.body;
    const { error } = ProductSchema.validate(input);

    if (error) {
        return next(Boom.badRequest(error.details[0].message));
    }

    try {
        const product = new ProductModel({
            title: input.title,
            description: input.description,
            price: input.price,
            images: [...req.files.map((file) => file.filename)],
        });
        const savedData = await product.save();
        res.json(savedData);
    } catch (e) {
        next(e);
    }
};

const Get = async (req, res, next) => {
    const { product_id } = req.params;

    if (!product_id) {
        return next(Boom.badRequest("Missing parameter (:product_id)"));
    }

    try {
        const product = await ProductModel.findById(product_id);

        res.json(product);
    } catch (e) {
        next(e);
    }
};

const Update = async (req, res, next) => {
    const { product_id } = req.params;

    try {
        const updated = await ProductModel.findByIdAndUpdate(product_id, req.body, {
            new: true,
        });

        res.json(updated);
    } catch (e) {
        next(e);
    }
};

const Delete = async (req, res, next) => {
    const { product_id } = req.params;

    try {
        const deleted = await ProductModel.findByIdAndDelete(product_id);

        if (!deleted) {
            throw Boom.badRequest("Product not found.");
        }

        res.json(deleted);
    } catch (e) {
        next(e);
    }
};

const limit = 8;
const GetList = async (req, res, next) => {
    let { page } = req.query;

    if (page < 1) {
        page = 1;
    }

    const skip = (parseInt(page) - 1) * limit;

    try {
        const products = await ProductModel.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);

        res.json(products);
    } catch (e) {
        next(e);
    }
};

const Product = { Create, CreateWithS3, Get, Update, Delete, GetList };

export default Product;
