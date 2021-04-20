const calculateTotalPrice = (items, basketItems) => {
    let total = 0;

    basketItems.forEach((item) => {
        total += parseFloat(item.price) * parseInt(items[item.id], 10);
    });
    return total;
};

const getOrderStatus = (code) => {
    switch (code) {
        case 0:
            return 'Waiting for payment';
        case 1:
            return 'Payment confirmed';
        case 2:
            return 'Order is approved';
        case 3:
            return 'We are are preparing your order';
        case 4:
            return 'Order is shipped';
        case 5:
            return 'Order is delivered';
        case 6:
            return 'Order is rejected';
        default:
            return 'Waiting for approval';
    }
};

export default calculateTotalPrice;
export { getOrderStatus };
