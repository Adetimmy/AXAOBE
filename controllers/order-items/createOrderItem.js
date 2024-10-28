const db = require("../../db");

// Create a new Order Item
module.exports.createOrderItem = async (req, res) => {
    const { price, quantity, order_id, product_id } = req.body;
        const newOrderItem = await db.orderItem.create({
            price,
            quantity,
            order_id,
            product_id,
        });
        res.status(201).json({ message: "Order item created successfully", data: newOrderItem });
};