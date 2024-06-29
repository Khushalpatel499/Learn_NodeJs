//object property shorthand
//this allow us to add values onto an object with a shorthand syntax under certain conditions

//object property shorthand syntax this syntax can be used when defining an object,
//it comes into play when we are setting up a property whose value comes from a variable of the same name
const name = "Khushal";
const userAge = "22";

const user = {
  //   name: name,
  name,
  age: userAge,
  location: "guna",
};

console.log(user);

//Object Destructuring
// it is useful when we have object and we tryping to access properties from it.
//the goal of destructuring is to exract object properties and their value into individual variables
//so instead of a product price of property, i could have a price variable with the value of 3.
//this is usefull when we are working with complex object that have a lot of properties.
//we can achieve this by creating individual variable like
const product = {
  label: "Red notebook",
  price: 3,
  stock: 201,
  salePrice: undefined,
};

// const label = product.label;
// const stock = product.stock;
//here is problem that we end up with lot of code for extract and we have multiple value with destructuring

//so new destructuring
//we can rename by using label:productLabel
const { label: productLabel, stock, rating = 5 } = product;
// console.log(label);
console.log(productLabel);
console.log(stock);
console.log(rating);

//we can also do destructring when working with function arguments.

// const transaction = (type, myProduct) => {
const transaction = (type, { label, stock = 0 } = {}) => {
  //   const { label } = myProduct;
  //instead of above we can destructure argument in argument list.
  console.log(type, label, stock);
};

transaction("order", product);

// if we pass no parameter in destrcuting then it give undefined which give error that we cannot destructre undefined or null.
//to fix this we can set a default value for that parameter equal to an empty object.
//from this we provide default object and also we can set that value also.
