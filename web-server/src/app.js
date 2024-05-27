// here we are going to load in express configure it to serve something up and then we gonna start the server
// express library expose is just a single function so express is actually a function as opossed to something like an object and we call it to create a new express appliction and that is exactly what we are gonna do.
// let create a variable to store our express applciation
// now the express function doesn't take any argument instead we configure our server by using various method provided on the application itself.
// now we tell our express appliction what exactly to do.
const express = require("express");

const app = express();
// imagine we owned the following domain app.com
//now obviously when someone vist app.com we wnat to show them something maybe the home page
