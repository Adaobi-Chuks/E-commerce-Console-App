var john = {
    name: "I am John",
    age: 24,
    isActive: true,
}

var mary = {
    name: "I am Mary",
    age: 23,
    isActive: true,
}

var sam = {
    name: "I am Sam",
    age: 29,
    isActive: false,
}

let users = new Map();

users.set("John", john);
users.set("Mary", mary);
users.set("Sam", sam);

console.log(users.size);
console.log(users.get("Sam"));
console.log(users.keys);
console.log(users.values);

for (const key of users.keys()) {
    console.log(key);
}

for (const [key, value] of users.entries()) {
    console.log(`${key}: ${value.name}, ${value.age}`);
}

users.forEach((value,key) => console.log(`${key}: ${value.name}, ${value.age}`));

var arrayArray = [["one", 1], ["two", 1]];
var newMap = new Map(arrayArray);
console.log(newMap);


