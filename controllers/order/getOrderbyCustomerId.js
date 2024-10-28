// Get all Orders by Customer ID
module.exports.getOrdersByCustomerId = async (req, res) => {
    const { customer_id } = req.params;
    try {
      const orders = await Order.findAll({
        where: { customer_id },
        include: { model: OrderItem, as: "orderItems" },
      });
      if (orders.length === 0)
        return res
          .status(404)
          .json({ message: "No orders found for this customer" });
  
      res
        .status(200)
        .json({ message: "Orders retrieved successfully", data: orders });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving orders", error: error.message });
    }
  };