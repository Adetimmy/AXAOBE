const { OrderItem, Order, Product } = require("../models"); // Import models


// Update an existing Order Item
exports.updateOrderItem = async (req, res) => {
    const { id } = req.params;
    const { price, quantity } = req.body;
    try {
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) return res.status(404).json({ message: "Order item not found" });

        orderItem.price = price || orderItem.price;
        orderItem.quantity = quantity || orderItem.quantity;
        await orderItem.save();

        res.status(200).json({ message: "Order item updated successfully", data: orderItem });
    } catch (error) {
        res.status(500).json({ message: "Error updating order item", error: error.message });
    }
};
