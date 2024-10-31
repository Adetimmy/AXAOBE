const calculateSubtotal = (items, quantity) => {
    console.log([items])
    return [items].reduce((total, item) => total + item.price.local * quantity, 0);
}

const calculateTotalAmount = (items, qunatity, shipping_fee) => {
    return calculateSubtotal(items, qunatity) + shipping_fee
}

module.exports = {
    calculateSubtotal, calculateTotalAmount
}