// here we are going to load in express configure it to serve something up and then we gonna start the server
// express library expose is just a single function so express is actually a function as opossed to something like an object and we call it to create a new express appliction and that is exactly what we are gonna do.
// let create a variable to store our express applciation
// now the express function doesn't take any argument instead we configure our server by using various method provided on the application itself.

// now we tell our express appliction what exactly to do.

const path = require("path");
const express = require("express");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
// app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(publicDirectoryPath));
// imagine we owned the following domain app.com
//now obviously when someone vist app.com we wnat to show them something maybe the home page of our company website
//but we gonna have other pages as well like app.com/help or app.com/about
// so here we have one domain app.com and all of its going to run on a single express server.
// we have setup though are multiple routes.
//we have root route, we have / help,we have /about and we could add others.
// how to setup our server to send a response when someone tries to get something at specific route.
//so we set up using a method on app
// we use app.get this lets us configure what the serve should do when someone tries to get the resource at a specific URL,may be we shoud sending back a html or sending back a json
// now the get method takes two arguments.
// the first is the route so the partial url , nothing for the first,/help for the second ,/about for the third and also take an function.
//Now the function is where we describe what we want to do when someone visit this paritcular route.
//this function get called with two arguments, the first is an object containing information about the incoming request to the server.
// this is commonly called REQ which is short form of request
// the other arguments is the response, so this contain a bunch of methods allowing us  to cutsomize what we are going to send back to the requester
//now down below we can go ahed and look at their request to figure out what we want to do.
//we do something like read data from the database or create some html
// res.send allow us to send something back to the requester
// if some one making request from the code using something like the NPM request library they will get this back.
// if they are making the request from the browser this is what going to display in the browser window.
// now the last thing we need to do is actually start the server up.
// if we were run the application we would never be able to view it in the browser to start the serverup
//we have to use one more method on app which will only ever use a single time in our application that is app.listen , this starts up this server and it has listen on a specific port for the moment we gonna use a common development port
// which is port three thousand.(3000) it is not hte default port.
// but when you vist  a website you don't provide the port becuase there are default ports for ex: for http based website its port 80.
// but for our local development environment as we are just viewing on our local machine port 3000.
// now other optional arguments we can pass to the listen method is a callback function which just run when the server is up and running.
// the process of starting up a server is not a synchronous process though it will happen almost instaly.
// we could print a little message to the console just letting the person who running the appliction know the server did start correctly.
app.get("", (req, res) => {
  // res.send("hello Express");
  res.send("<h1>Weather</h1>");
});

app.get("/help", (req, res) => {
  // res.send("Help page");
  // res.send({
  //   name:"khushal",
  //   age:22,
  // })
  res.send([
    {
      name: "Khushal",
    },
    {
      fullname: "Khushal Patel",
    },
  ]);
});

// Goal: setup two new routes
//1. Setup an about route and render a page title
//2. Setup a weather route and render a page title
//3. test your work by visiting both in the browser

app.get("/about", (req, res) => {
  // res.send("About Page");
  res.send("<h1> This is about the weather </h1>");
});

app.get("/weather", (req, res) => {
  // res.send("Weather Detail");
  res.send({
    Place: "india",
    temp: 22.3,
    humidity: 0,
  });
});

app.listen("3000", () => {
  console.log("Server is up on port 3000");
});

// new method to run  node src/app.js
// it never gonna stop unless we stop it because it job is to stay up and running.
// so now any one visit our root of website they get a response right away.
// to run on over machine we use localhost:3000
// so when we visit the url in the browser it went off to our server , the express server found the matching route  and it processed the request using our handler, the handler used response.send to send back a text response and that is exactly what we see on browsr.
// we we change any thing then we have to restart the server
// so instead of doing again and again we just use nodemon which we install earlier globally.

// in reality we don't send back string , we either send back html designed to render in the browser or json designed to be consumed and used by code.
// for json we provide either an object or an array as the value to send.
// when we send object and visit the page we gonna get a json response back.
//Express is gonna detect we have provided an object , it automatically going to stringfly json for us.

//Goal: Update routes
//
//1. Setup about route to render a title with HTML
//2. Setup a weather route to send back JSON.
// -- Object with forecast and location strings.
// 3. Test your work by visiting both in the browser.

// now serve up the contents of an entire directory.
// so if we have a really long web page with lot of html, we don't want to write all of that inside of our node server inside of a string.
// it will be difficult so it would be nice to have a separate html file.
// so we are gonna do is configure express to serve up an entire directory of assests  that could contain html file , css file and client side js videos images and more.
//first up let create the directory that we are gonna serve up.
// that is public any think is gonna here is server here is a part of our express server.

// now set the path of the pulic folder to express.and it can be a relative path.
//but now it need to be an absolute path from the route of or machine.
// to get that done node actually provides us with two very handy variables.
// first one is __dirname  which is shortcut for directory name.
// other is __filename.

console.log(__dirname);
console.log(__filename);

// the first one dirname contains a path to the directory fo current script livein (here app.js script livesin the src directory (root of harddrive to src folder)).
//other filename it provide the path of file itself.
//we going to use the dirname variable to get the correct path to the public directory.
//we currently don't have that path but we can do a little path manipulation to get it.
// both these values they are provided by the wrapper function.
// now we remember that when we debug nodejs we saw that our code get wrapped in this function and that function provide various things to our code like the required function which we have used.
// so there are two ways to do that to provide the public folder path.

//we can use a little string manipulation to try to break this string up and get it to what we want.
//but there is actually a core node module called path that provides us a ton of great utilites for working with paths.
//This is done in a cross OS compatible way and tht's the tool we are gonna use.
//we can find more about path by heading over to nodejs in path
// we use the path.join
// we are going to load this core module but we require it load before the npm module, it is not neccessary but it is good for organized.

// path.join indeed a function so let call it as such and it going to return the final path and we pass to the individual pieces to the path.
// and it does the job of manipulating the string for us.

console.log(path.join(__dirname));
// we can pass more path to join together path or by pass second argument a string and manipulate that path. if i want to go to up folder then use ..
// use /.. to go to another directory.
//but for our purpose we don't go to another directory we use ../public to go to another folder.
//now we can configure express to serve that directory.
//we can serve the directory by after express by app.use() it is a way to customized your server.
//we going to pass express.static() is a function and we calling it and we passing its return value into use.
// static take the path of folder we want to serve up .
//we can also undo that change and create a separate variable and reference that.
//now we test things out. by localhost:3000
//we can also visit the html page by html path localhost:3000/index.html
//we also see tha we are never going to see the other route hanlder setup below.
//basically express work as is going through your application untill it find a match for route.
// in this case express static call it is indeed going to find a match.
//it going to find index.html and that going to match the route url ,so first app.get () not find.

console.log(path.join(__dirname, ".."));
console.log(path.join(__dirname, "../.."));
console.log(path.join(__dirname, "../public"));

// Goal: Create two more HTML files
// 1. create a html page for about with "About" title
//2. Create a html page for help with "Help" title
//3. Remove the old route hanlders for both
//4. Vist both in the browser to test your work.

//now we see how to add css style sheet to style the application , client side js to add som dynamic user interaction and images to show on the screen.
//use create css folder and inside it create style.css and loaded it into our html files.
//use link rel for relationship stylesheet and href= for path(it is relative to our current location and it absolute start public directory).
//there is two path relative path like ./css/style.css
//and absolute path start with a forward slash(/) if we start a path with / that will bring route of the hard drive.
//but this being accessed in the browser
//this is relative to the web server route which we setup as the public folder.
//we also create client side js message which show in developer tools.

//now statics means that the assets are static they do not change.
// now we see dynamic pages with templating that is a tempalate engine to render dynamic web pages using express.
// the template engine that we are going to set up is called handlebars.
//handlebar allow us to do two very important things
//1. allow us to render dynamic documents as opposed to static ones.
//2. allow us to do is to easily create code that we can reuse across the pages.
//let suppose i create a header and footer in index.html and i want to use it on all the web pages. to make feel like one cohesive experience.
//without template engine ,i have to write header at one place and copy and paste to other files.
// that is not good , so it nice to be able to have the header markup in one place and be able to reuse it across all of pages of website with a template engine.
//handlebars we will able to render dynamic content and we will be able to easily use and reuse little pieces of markup in various pages in our app.'
// to get run there are two npm modules, first is npm handlebars,this is low level library that implements handlebars in js.
//it can be used in a wide variety of settings like the browser ,the server desktop application with electron.
// for our purpose we want to use handlebars with our express server.
// but handlerbas solo can't done our work there is another hanldlebars library though which like a plug in for express ,which essentially integrate handlebars into Express.
// which is npm hbs
// hbs uses handlerbars behind the scene
//hbs make easy to integrate with express.
