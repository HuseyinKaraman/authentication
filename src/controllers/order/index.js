import Boom from "boom";
import User from "../../models/user.js";
import OrderModel from "../../models/order.js";
import OrderSchema from "./validations.js";

const Create = async (req, res, next) => {
    const input = req.body;
    input.items = input.items ? JSON.parse(input.items) : null;
    const { error } = OrderSchema.validate(input);

    if (error) {
        return next(Boom.badRequest(error.details[0].message));
    }

    const { user_id } = req.payload;

    try {
        const order = new OrderModel({
            user: user_id,
            adress: input.address,
            items: input.items,
        });

        const savedData = await order.save();

        res.json(savedData);
    } catch (e) {
        next(e);
    }
};

const List = async (req, res, next) => {
    try {
        const orders = await OrderModel.find({}).populate("user", "-password -__v").populate("items");

        res.json(orders);
    } catch (e) {
        next(e);
    }
};

const GetMyOrders = async (req, res, next) => {
    const { user_id } = req.payload;

    try {
        const orders = await OrderModel.findById(user_id).populate("purchases.item");

        res.json(orders);
    } catch (e) {
        next(e);
    }
};


const Order = {
    Create,
    List,
    GetMyOrders,
}

export default Order;