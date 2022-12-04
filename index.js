let users = new Map();

users.set("John", "1");
users.set("Mary", 2);
users.set("Sam", 3);

for (const key of users.keys()) {
    console.log(`${key}:`);
}

// users.forEach((value,key) => console.log(`${key}: ${value.name}, ${value.age}`));
