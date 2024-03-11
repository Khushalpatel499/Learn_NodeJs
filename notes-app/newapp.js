// require("./utils.js");
// const name = "khushal";

// const name = require("./utils.js");
// console.log(name);

const add = require("./utils.js");
console.log(add(5, 3));

// imp: all of our files which can refers to as module have their own scope
// ex: let we create name in utils.js and try to console in new app.js then it give error that name is not defined.
// so question is how i can do then?
// so we basically we need to explicitly export all of this stuff should share outside world
// so we use another module system which is module  exports, whatever we assign to module.exports is availble as the return value from when require the file.

// 2.challenge: Define and use a function in a new file
// 1. Create a new file called notes.js
// 2. create getNotes function that returns "YOur notes.."
// 3. Export getNotes function
// 4. From newapp.js load in and call the function printing message to console

const getNotes = require("./notes.js");

console.log(getNotes());

// use require to load npm pakage
const validator = require("validator");

console.log(validator.isEmail("andrew@gmail.com"));
console.log(validator.isEmail("example.com"));
console.log(validator.isURL("https://mead.io"));
console.log(validator.isURL("http//:mead"));

//3. challenge: use the chalk library in your project
//   1. Install version 2.4.1 of chalk
//   2. loadd chalk into newapp.js
//   3. use it to print the string 'Success!' to the console in green
//   4. Text your work

// Bonus: use docs to mess around with other styles.Make text bold and inversed.

// use require to load npm pakage chalk

const chalk = require("chalk");
console.log(chalk.green("Success!"));
console.log(chalk.green.bold.inverse("Success!"));

//global npm packages.
// so far all of the packages we have worked with are known as locally install the packages.
// that when we install dependencies explicitly into our project like we have done with validator
// when we install a module globally we actually don't load it indirectly to our source files instead we install it globally and it gives us acces to a new command in terminal
// it going to allow us to run application and automatically restart when we change in code
// we use the package nodemon
// command: npm install nodemon@version -g
// g stand for global
// for max and linux : sudo npm install nodemon@version -g
// now run node app by command : nodemon newapp.js
// this time we dont see nodemon is as dependencies in package.json

// continue to node module system
// there are two important things file system and command line arguments
// file system is used to store user notes
// and command line arguments to get input from the user

//Getting input from users
// if an user try to use notes app to add new notes than he need to  provide some information such as  title and a body
// we are going to handle getting input from the user via a command line arguments
//later we learn about when we get in webservers how to get input into your node application from a client such as a browser.
// now we use same command but with a value in command portal: node newapp.js khushal
// now we provide some addditional information that can be use to do something dynamic lik print a greeting with that value inside of message that print
// on process(it is a big object)there is property where we can access all of the command line arguments passed in to our app.
// command : process.argv
//   argv is an argument vector or in nodejs it just an array that contain all the argument provided
// console.log(process.argv);
// it give an array with 2 string always provided ,1. is the path of nodejs executed in our machine
//                                                 2.is path of the file newapp.js

//                 3. is actually the value we provided here it is a string

// extract the individual value out of the array
//argv:a property that holds an array of command-line values provided when the current process was initiated.
console.log(process.argv[2]);

//so in nodejs app use first value after the script name to actually determine what action we want to take this will be know as our command

const command = process.argv[2];

if (command === "add") {
  console.log("Adding notes");
} else if (command === "remove") {
  console.log("Removing notes");
}

// to set the title we use node newnode.js add --title='this is my title'
// console.log(process.argv);
// passing command line argument is not unique to our application so it would be best to look for it npm pakage that can take care for us

// use tool to pass process.argv making easier to set up our argument else we have to all time use if else condtion and check string present and add console so we use npm package to take care of this
// node doesnt provide any argument passing its a very bare bones utility
// there are ton of great npm package out there that are gonna make it really easy to set up our commands and option we want
// we use yargs

const yargs = require("yargs");
// now do some comparing and contrasting
// console.log(process.argv);
// console.log(yargs.argv);
// yargs give an object with two properties
//  1. underscore property: which will get populated with various arguments
//  2. $0 which is the name of file that we executed
// our command shows up in the underscore property  and we have actual title property on the object
// command : node newapp.js --help
// come default with yargs give helpful information about whats going on with our app

// customize yargs version
yargs.version("1.1.0");

// use yargs for note app

//add,remove,read,list
// these are four  distinct commmand we want to setup and customize
// i want display help option for each
// i want options so i can pass in data

// Create add command
// we use yargs with command that contain  property command,describe and handler( thats the code actually going to run when someone use the add command,it setup with a function value )

yargs.command({
  command: "add",
  describe: "Add new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: false,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    // console.log("Adding a new note", argv);
    console.log("Title :" + argv.title);
    console.log("Body: " + argv.body);
  },
});
// yargs.parse();
// yargs.argv;

//create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  handler: function () {
    console.log("Remove the note");
  },
});

// console.log(yargs.argv); // when we access argv property on yargs,yargs know to pass those arguments
//other way is
// yargs.parse(); //it doesn't take any arguments
//it acutally goes throught the process of passing the arguments with all the configuration detail we provide with call the yargs.command
// yargs.argv;

//4.challenge : ADD two new command

// 1. setup command to support 'list' command (pront placholder message for now)
//2.setup command to support 'read' command (print placeholder message for now)
//3.test your work by running both commands and ensure correct otuput

// create list command

yargs.command({
  command: "list",
  describe: "Show the list",
  handler: function () {
    console.log("The list of notes");
  },
}).argv;

// create read command

yargs
  .command({
    command: "read",
    describe: "Read the note",
    handler: function () {
      console.log("Read the corrosponding note");
    },
  })
  .parse();
// console.log(yargs.argv);
yargs.parse();
//   now we know that add need  title and body,remove need title for remove,and read need title of note
// for these another property is builders ,it value is an object and on that object we define all  the option we want
// to define a new option we set it up as a property on the builder object
// after define we can now access that in the command handler by provide arguments to function ,we give this function to yargs
//now we can access argv
// i can run node app without title it still access argv, we have  demandOption property in builder which is by default false
//if we change it than we have to provide it also to work command correctly.
//if we not write title means: node newapp.js add --title then we see that the value of title is boolean(true) which we dont want we want an empty string.
// to do that we set another property type:'string'
// now if we want to print title explicitly : argv.title

// 5. challenge: add an option to yargs
//  1. setup a body option for the add command
//  2. configure a description, make it required ,and for it to be a String.
//  3.log the body value in the handler function
//  4. test your work

//stroing the data for our notes application
//before we use fs core module to save all of our notes data inside a file system.
//that data is a json data
// we are going to do the exact same thing to store our notes inside of a text file.
//so we are going to have an array of object where each object represent a note and each object have various properties like title and body.
