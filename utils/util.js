const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

const calculateTotalAmount = (items, shipping_fee) => {
    return calculateSubtotal(items) + shipping_fee
}

module.exports = {
    calculateSubtotal, calculateTotalAmount
}