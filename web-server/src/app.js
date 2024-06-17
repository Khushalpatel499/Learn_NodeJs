// here we are going to load in express configure it to serve something up and then we gonna start the server
// express library expose is just a single function so express is actually a function as opossed to something like an object and we call it to create a new express appliction and that is exactly what we are gonna do.
// let create a variable to store our express applciation
// now the express function doesn't take any argument instead we configure our server by using various method provided on the application itself.

// now we tell our express appliction what exactly to do.

const path = require("path");
const express = require("express");
const { title } = require("process");
const hbs = require("hbs");
const { kMaxLength } = require("buffer");

const app = express();

//setting handlebars

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
// app.use(express.static(path.join(__dirname, "../public")));
// app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  // res.render("index");
  res.render("index", {
    title: "weather app",
    name: "Khushal Patel",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Khushal Patel",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Thank you for coming to this page.",
    title: "help",
    name: "khushal Patel",
  });
});

app.get("/help/*", (req, res) => {
  // res.send("Help article not found");
  res.render("404", {
    title: "404",
    name: "Khushal Patel",

    errorMessage: "Help article not Found",
  });
});

app.get("*", (req, res) => {
  // res.send("404 page");
  res.render("404", {
    title: "404",
    name: "Khushal Patel",

    errorMessage: "Page not Found",
  });
});
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
//install it and it add all code to node_modules and dependencies to package.json and package-lock.json.
// now the process of getting set up is actually really easy.all we need to do is tell express which templating engine we installed and we do that by using a new method on that is app.set,set allow us to set a value for a given express setting
//we have a key setting name and a value.(the value we want to set for the setting in our case to set up a view engine like express the value is view engine)
//it is important that its this match up exactly with the spacing and capitalization taken into account. if we don't save exactly express isn't going to know what we are trying to do.
// the value we used is the name of module we installed in our case is hbs
// this single line only nedd to get handlebars set up.
//now we use this to create some dynamics templates.
//our handlebars templates to live in a specific folder that is in the root of the project. the folder is views. here we put our handlebars views.
//we are going to create view that replace the home page,
//so instead of the home page being a static document served up from public its going to be a handlebars templates.
// i create index.hbs which is handlebars extension.(handlebars files nothing more than html with nice features for injecting dynamics values)
// now no one can acess this page from our webserver. for that we need to set up a route.
// so that is app.get() we gonna show this on home page so leave first empty, and second with function of res and req.
//before we use res.send to send back response but now we used res.render it allow us to render one of our views.
//we configure express to use view engine hbs ,with renders we can render one of our handlebars.
// we do is provide as the first argument the name of the paritcular view we want to use inside the quotes and no need to provide the file extension.
// now for dynamic view we gonna provide a value for the title.
//so instead of hardcoding in file it is provided by nodejs.
// so to provide a value that accessible in the template we have to provide a seccond argument to render.
//so second argument is an object which contains all of the values we want that view to be able to access.
// let i provide name and title both values to inject into template. template take advantages of them and that what going to create the dynamic html documents.
// to use title and name which create in node js in handlebars we used syntax of handlebars.
//if we want to inject an value in hbs file we open and close two curly braces.
//inside reference the thing trying to access , which title and name

//Goal: Create a template for help page

//1. Setup a help template to render a help message to the screen
//2. Setup the help route and render the template with an example message
//3. visit the route in the browser and see your help message print

//now we see how we customize how handlebars is setup.
// how customize the location and name of the views directory.
//if we change the name of folder of views to other it fail because it is the default location that express expects your views to live in.
// we can cutosmize it but we have to tell express where to look.
// this is going to require us to create a brand new path.
// it is similar to how we defined public directory path.
// diefine a views path and set this equal to an absolue path to that views folder which i changed the name.
// after that we tell express by an another app.set call.
//let i change the views folder to templates.
// similary we can customized it location.
// now we organized our express configuration.

//now we see more about express documentation
//we have express function to generate a new instance of the application.
// we have application ,this refers to our app variable
//then we have request, response and router.
// request and response objects that are callback for a route get passed.

//now we see partials with handlebars
//partials allow us to create a little template which is part of a bigger web page.
// parts of web pages that we are gonna reuse across multiple pages.
//the first thing we have to do work with partials is actually load in hbs for the first time and configure it.
// after load we need to tell handle bar where are going to put our partials.
//these are also files with an hbs extension similar to before.
//inside the templates dir we going to put two dir inside.
// one we called views and other we called partials.
// so the three files about,help,index go into views and for that we also change the views path.
// now we can tell hbs that we are going to put our partials in partial dir.
// we create another path for partials.
//now to congfigure it, use hbs.registerPartials() ,it take a path of dir where your partial lives.
// now create a partial header.hbs ,this is a header that we are gonna show on all of the pages throught out our site. inside it also a complete html documentation.
// first create static title in partial then use dynamic title inside of partials
//now render the partial in our pages.
// to render use {{>}} after the greater than sign provide the partial name which is the file name.
//but when we save we got error that partial header could not be found.
// error because nodemon moniotor only js extension file not with handlebars templates.
//if server doesn't restart when new templates are creted the server is never going to pick up on that.
//we can easily address this by customzing our node commands.
// we make a small tweak to the command we have been running so far.
// command: nodemon src/app.js -e js,hbs (e is short for extension .this allow us to provide after the space a comma separated list of extension that nodeman should watch)
// currently we have three page with each one their h1, we do that remove those and have that rendered in the header instead.
// add header on all pages.

//so now instead of displaying this static text is to grab the title value .
// now instead of static text we going to reference the title inside .
//now that we have the header in place we can add stuff inside of this file that we want to show on every page like navigation page with links that allow us to switch between the pages
//use a partial makes it really easy to set something up once and use it everywhere.
//partials can be used throughout to application to make it really easy to render the same thing over and over again.

//Goal: Create a partial for the footer
//

//1. Setup the template for the footer partial "created by some Name"
//2.Render the partial at the bottom of all three pages
//3.Test your work by visiting all three pages.

// now see how to set  up a 404 page for your express server.
//so instead of showing cannot get error we could even include links back to the home page so they can find the page that actually does exist.
// for 404 page set we customized our express application by set another route handler using app.get, and the string that is no one explict match that is everythink else ,express use wild card character *.

//why app.get(*) come last after all other routes are setup?
// this has to do with how express is going to end up matching the incoming request with correct route handler
// when nothing match and it come to wildcard character it say everything match .

//Goal : Create and render a 404 page with handlebars
//1 Setup the template to render the header and footer.
//2. setup the template to render an error message in a paragraph.
//3. Render the template for both 404 routes.
//- Page not found.
//- Help article not found.
//4.test your work./what and /help/units

//now learn how our web application communicate with the web server to get some data
//we learn how to create own http jason end point using express.
