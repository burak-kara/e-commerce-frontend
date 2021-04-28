const calculateTotalPrice = (items, basketItems) => {
    let total = 0;

    basketItems.forEach((item) => {
        total += parseFloat(item.price) * parseInt(items[item.id], 10);
    });
    return total;
};

export default calculateTotalPrice;
