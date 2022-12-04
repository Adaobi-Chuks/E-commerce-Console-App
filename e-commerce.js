const prompt = require("prompt-sync")({sigint: true});

const cart = [];
const products = new Map();

products.set("Drinks", [["Pepsi", 200, 4], ["Coke", 200, 4], ["Fanta", 200, 4]]);
products.set("Food", [["Fanta", 200, 4], ["Pepsi", 200, 4], ["Coke", 200, 4]]);
products.set("Beverages", [["Coke", 200, 4], ["Fanta", 200, 4], ["Pepsi", 200, 4]]);

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
    if (num < 0 || num > 3) {
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
        totalAmount += (product.amount * product.quantity);
    });
    return totalAmount;
}

const total = calculateTotal();

const calculateDiscount = () => {
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
const discount = calculateDiscount();

const calculateTax = () => {
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
    while (true) {
        console.log("What action would you like to perform?\nOptions: \n\ta) Add to cart\n\tb) Remove from cart\n\tc) Checkout");
        const option = prompt().toLowerCase();
        switch(option) {
            case "a":
                console.log(`\n${displayCategory()}`);
                console.log("Choose a category to shop for between: 1 and 3 above\n\t");
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
                        + `\n\nTotal purchase: ${total}\nTax: ${calculateTax()}\nDiscount:${discount * 0.01 * total}\n\n`
                        + `Amount to be paid = ${(total * discount) + calculateTax()}`
                        + `\n\nPlease expect your package within 5 working days to be delivered to ${address}\n\n`);
            default:
                continue;
        }
        console.log("\n" + "\n**************************************CART**************************************\n" 
                + displayCart() 
                + `\n\n\tTotal: ${total}` 
                +`\nYou are eligible for ${discount}% discount\n`);
        prompt("Press enter to continue!\n");
    }
}
manageOrders();
