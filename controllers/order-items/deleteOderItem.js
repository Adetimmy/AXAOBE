// Delete an Order Item
module.exports.deleteOrderItem = async (req, res) => {
    const { id } = req.params;
    try {
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) return res.status(404).json({ message: "Order item not found" });

        await orderItem.destroy();
        res.status(200).json({ message: "Order item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order item", error: error.message });
    }
};