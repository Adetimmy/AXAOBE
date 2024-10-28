// Get Order Items by Order ID
module.exports.getOrderItemsByOrderId = async (req, res) => {
    const { order_id } = req.params;
    try {
        const orderItems = await OrderItem.findAll({ where: { order_id }, include: Product });
        if (orderItems.length === 0) return res.status(404).json({ message: "No order items found" });

        res.status(200).json({ message: "Order items retrieved successfully", data: orderItems });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving order items", error: error.message });
    }
};