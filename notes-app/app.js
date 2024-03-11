// used fs which is an object .writeFileSync()  it is a method and it take two arguments ,that is name of file and the data to write
const fs = require("fs");
fs.writeFileSync("notes.txt", "This file was created by Node.js.");

// it is not run because fs is not defined ,we have to load file system module before it use this is done using require function that node provide
// the require function is how we load in other things whether its a core node module , a another file we created or an npm module we choosen to install into use in our project to load in the files FileSystem.
// here we pass a string in require ,which is we only looking to load in a core node module we just provide the name of the module
//  and this  function return stuff so we have to store it into a variable
// write file and write file sync method are responsible for writting data to a file, if file doesn't exist it create it and if it exist  content will be overwritten with the new provided messange

// 1.Challenge: Append a message to notes.txt

// 1. use appendFileSync to append to the file
// 2. Run the script
// 3. Check your work by opening the file and viewing the appended text

fs.appendFileSync("notes.txt", " message is append.");

// we learn how to use require function to load in a node module
// but now how use require function to load in another file we have created, as project goes large we like define a function in one file and then require in another file
