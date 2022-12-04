const prompt = require("prompt-sync")({sigint: true});

const cart = [];

cart.push({
    name: "Pepsi",
    amount: 200,
    quantity: 4,
}, {
    name: "Coke",
    amount: 200,
    quantity: 4,
})

const products = new Map();

products.set("Drinks", [["Pepsi", 200, 4], ["Coke", 200, 4], ["Fanta", 200, 4]]);
products.set("Food", [["Fanta", 200, 4], ["Pepsi", 200, 4], ["Coke", 200, 4]]);
products.set("Beverages", [["Coke", 200, 4], ["Fanta", 200, 4], ["Pepsi", 200, 4]]);

const displayCategory = () => {
    let category = "";
    let count = 0;
    for (const key of products.keys()) {
        category += `${count + 1}.\t${key}\n`;
        count++;
    }
    return category;
}

// console.log(displayCategory())

const displayProducts = (num = 0) => {
    if (num <= 0 || num > 3) {
        return `Please input a valid Aisle or Product`
    } else {
        const key = Array.from(products.keys())[num];
        const values = products.get(key);
        let toStringProduct = "";
        values.forEach(value => {
            toStringProduct += `\n${value[0]}\t\t\t${value[2]}\t\t  ${value[1]}`
        })
        return `Product\t\tQuantity\tAmount` + toStringProduct;
    }
}

console.log(displayProducts());

const calculateTotal = () => {
    let totalAmount = 0;
    cart.forEach(product => {
        totalAmount += (product.amount * product.quantity);
    });
    return totalAmount;
    // return `Your total purchase cost ${totalAmount} with a tax of ${tax}: Total = ${totalAmount + tax}`;
}

const total = calculateTotal();

const calculateDiscount = () => {
    let discount;
    if (total > 200000) {
        return 20;
    } else if (total > 150000) {
        return 15;
    } else if (total > 100000) {
        return 10;
    } else if (total > 50000) {
        return 5;
    } else if (total > 40000) {
        return 3;
    } else if (total > 30000) {
        return 2;
    } else {
        return 0;
    }
}

const calculateTax = () => {
    return total * 0.1;
}

console.log(calculateTax());

const discount = calculateDiscount();

const displayCart = () => {
    let toStringProduct = "";
    cart.forEach(product => {
        toStringProduct += `\n${product.name}\t\t\t${product.quantity}\t\t  ${product.amount}`
    })
    return `Product\t\tQuantity\tAmount` + toStringProduct + 
            `\n\n\tTotal: ${total}` +
            `\nYou are eligible for ${discount}% dicount`;
}

// console.log(displayCart());


//manage order: does the following:
//add to cart
//remove from cart
//checkout: asks for an address, a rider will be with you, thanks for shopping
//view cart


