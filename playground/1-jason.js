//json work really well with objects and array in js.
//js object store data
const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday",
};
//now the goal is to covert into json which is more than a string.
//fs core module only know how to work with string data.
//we have to figure out how we take an object represented as string to save it and load that back in and get the original object back.

//1st method
//JSON.stringify() ,it is js method that takes in an object or an array or any value and return json string representation.
const bookJSON = JSON.stringify(book);
// change directory: cd ../playground
console.log(bookJSON);
//bookJSON is an string not an object here we see double quotes added to all property names.

//the book object has title property the json data doesn't
// console.log(bookJSON.title);//undefined

//convert jason to object
const parseData = JSON.parse(bookJSON);
console.log(parseData);
console.log(parseData.title);

// now integrate the json with the file system
const fs = require("fs");

fs.writeFileSync("1-jason.json", bookJSON);

//so now reterive the data form json file
const dataBuffer = fs.readFileSync("1-jason.json");
// it is a data buffer because what come back is not a string it is actually a buffer way
//for nodejs  to represent binary data
console.log(dataBuffer);

//to get string there is a two string method we can use
const dataJSON = dataBuffer.toString();
console.log(dataBuffer.toString());
const data = JSON.parse(dataJSON);
console.log(data.title);

//challenge: Work with JSON and the file system
//1.Load and parse the JSON data
//2.CHnage the name and age property using your info
//3.Straingify the changed object and overwrite the original data
//4.Test your work by viewing data in the JSON file

fs.writeFileSync("1-jason.json", '{"name":"Andrew","Planet":"Earth","age":27}');
const dataBuffer1 = fs.readFileSync("1-jason.json");
console.log(dataBuffer1);

const dataJson1 = dataBuffer1.toString();
console.log(dataJson1);
const data1 = JSON.parse(dataJson1);
console.log(data1);
data1.name = "khushal";
data1.age = "22";

console.log(data1);
const upadateData = JSON.stringify(data1);

console.log(upadateData);
fs.writeFileSync("1-jason.json", upadateData);
