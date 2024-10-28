// Delete an Order (and associated Order Items)
module.exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      await order.destroy();
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting order", error: error.message });
    }
  };