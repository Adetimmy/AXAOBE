const calculateSubtotal = (items, quantity) => {
  console.log([items]);
  // as quantity i spassed as an array
  const qty = quantity.reduce((total, qtys) => total + qtys, 0);
  return [items].flatMap(val => val).reduce((total, item) => total + item.price.local * qty, 0);
};

const calculateTotalAmount = (items, qunatity, shipping_fee) => {
  return calculateSubtotal(items, qunatity) + shipping_fee;
};

module.exports = {
  calculateSubtotal,
  calculateTotalAmount,
};
