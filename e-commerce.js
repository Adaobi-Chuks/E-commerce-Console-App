const prompt = require("prompt-sync")({sigint: true});

const cart = [];
const products = new Map();

products.set("Drinks", [["Pepsi", 500, 1], ["Coke", 500, 1], ["Fanta", 500, 1]]);
products.set("Food", [["Rice", 2000, 1], ["Swallow", 5000, 1], ["Pie", 7000, 1]]);
products.set("Furniture", [["Table", 15000, 1], ["Tv", 50000, 1], ["Chair", 8000, 1]]);
products.set("Cosmetics", [["Cream", 6000, 1], ["Scrub", 3000, 1], ["Perfume", 4000, 1]]);
products.set("Clothes", [["Trouser", 7500, 1], ["Shirts", 5000, 1], ["Shoes", 20000, 1]]);
products.set("Car", [["Honda", 500000, 1], ["Camry", 1000000, 1], ["Corolla", 750000, 1]]);
products.set("Appliances", [["Laptop", 500000, 1], ["Phone", 200000, 1], ["Tablet", 400000, 1]]);

const displayCategory = () => {
    let category = "";
    let count = 1;
    for (const key of products.keys()) {
        category += `${count}. ${key}\n`;
        count++;
    }
    return category;
}

const displayProducts = (num = 0) => {
    let count = 1;
    if (num < 0 || num > 7) {
        return `Please input a valid Aisle or Product`
    } else {
        const key = Array.from(products.keys())[num - 1];
        const values = products.get(key);
        let toStringProduct = "";
        values.forEach(value => {
            toStringProduct += `\n${count}.\t${value[0]}\t\t${value[2]}\t\t  ${value[1]}`
            count++;
        })
        return `\tProducts\tQuantity\tAmount` + toStringProduct;
    }
}

const calculateTotal = () => {
    let totalAmount = 0;
    cart.forEach(product => {
        totalAmount += (product[2] * product[1]);
    });
    return totalAmount;
}

const calculateDiscount = (total = calculateTotal()) => {
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

const calculateTax = (total = calculateTotal()) => {
    return total * 0.1;
}

const displayCart = () => {
    let toString = "";
    cart.forEach(product => {
        toString += `\n${product[0]}\t\t${1}\t\t  ${product[1]}`
    })
    return `Product\t\tQuantity\tAmount` + toString;
}

const manageOrders = () => {
    console.log("\n*********************************************************************************");
    console.log("********************************Genesys Groceries********************************");
    console.log("*********************************************************************************\n");
    const name = prompt("Please input your name to gain access to your personal cart: ").toUpperCase();
    console.log(`\n\tWelcome ${name}!!!\n\n\tSo pleased to have you here ${name}.\n`);
    console.log(`Hey ${name}, buy at least goods worth 30000 naira to qualify for discount of up to 20%.\n`);
    while (true) {
        console.log("What action would you like to perform?\nOptions: \n\ta) Add to cart\n\tb) Remove from cart\n\tc) Checkout");
        const option = prompt().toLowerCase();
        switch(option) {
            case "a":
                console.log(`\n${displayCategory()}`);
                console.log("Choose a category to shop for between: 1 and 7 above\n\t");
                const category = prompt();
                console.log(displayProducts(category) + "\n\nChoose an item to add to your cart between: 1 and 3 above\n\t");
                const itemToAdd = prompt();
                const key = Array.from(products.keys())[category - 1];
                cart.push(products.get(key)[itemToAdd - 1]);
                break;
            case "b":
                console.log(`\nChoose an item to delete from your cart between: 1 and ${cart.length} above\n\t`);
                const itemToDelete = prompt();
                cart.splice(itemToDelete - 1, 1);
                break;
            case "c":
                console.log("Thank you for shopping with us.\n")
                const address = prompt("Please input your address: ");
                return console.log("\n*************************************RECEIPT*************************************\n"
                        + displayCart() 
                        + `\n\nTotal purchase: ${calculateTotal()}\nTax: ${calculateTax()}\nDiscount:${calculateDiscount() * 0.01 * calculateTotal()}\n\n`
                        + `Amount to be paid = ${(calculateTotal() * calculateDiscount()) + calculateTax()}`
                        + `\n\nPlease expect your package within 5 working days to be delivered to ${address}\n\n`);
            default:
                continue;
        }
        console.log("\n" + "\n**************************************CART**************************************\n" 
                + displayCart() 
                + `\n\n\tTotal: ${calculateTotal()}` 
                +`\nYou are eligible for ${calculateDiscount()}% discount\n`);
        prompt("Press enter to continue!\n");
    }
}
manageOrders();
