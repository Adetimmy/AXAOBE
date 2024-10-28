
// Get Order Items by Product ID
module.exports.getOrderItemsByProductId = async (req, res) => {
    const { product_id } = req.params;
    try {
        const orderItems = await OrderItem.findAll({ where: { product_id }, include: Order });
        if (orderItems.length === 0) return res.status(404).json({ message: "No order items found" });

        res.status(200).json({ message: "Order items retrieved successfully", data: orderItems });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving order items", error: error.message });
    }
};