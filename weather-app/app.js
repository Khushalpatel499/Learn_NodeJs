console.log("starting");
// in synchronous program one line runs after the next regardless of how long each line takes to execute

//now used asynchronous function that node provide settimeout allows us to run some code after a specific amount of time has passed
//it take two arguments frist is function and the second is the number of milliseconds you want to wait before the callback gets executed.

setTimeout(() => {
  console.log("2 second time");
}, 2000);

setTimeout(() => {
  console.log("0 second time"); // why it give output after stopping ?
}, 0);
console.log("Stopping");

// for synchronous we only worried about the callstack but for asynchronous we have to know about call stack,nodeapi, and event loop of callback queue.
//steps:
/* 1.the main function push on the callstack.
2. whenver function call in program is add to callstack.
3. after done it will remove from the callstack.
4.settimeout is a function so a new push on the call stack but it is not a part of js programming language.instead nodejs create the implementation of settimeout using c++.
5.so when we call setime out it really registred an event with node js api.

6. untill wait for 2 sec we can do other stuff in callstack because js is single thread programming language we can do one stuff on callstack at a time.
7.now we move to next and there is another settime out first come in callstack and due to part of nodejs it go to nodeapi and wait for 0 sec. and we have now two api waiting in background.
8. now 0 sec done and how this call back executed that is by using callback queue and event loop.
9. the work of callback queue is that maintain a list of all the callback functions that are ready to get exeuted.
10. so now it added to the callback queue and it ready to executed so now it have to be added to callstack so now event loop come into play.
11 . event loop look two things that first is the callback queue and other is callstack empty if it is empty then it run callback queue item so event loop need to wait for callstack to be empty.
12. at this time we see that main is present in call stack so callback has to be wait.
*/

// if we want to get real time data into our app we gonna have to make an http request
//http request is core of building of real world application
//our node application making http requests to another companies servers to get some task done.
//like the weather information i would send to the location i want the weather information and get back the weather information
//weather api we use is darksky.net is just a standard weather service we can use it to get forcaast.
//we want the raw data to use it in our app.
//that can be found at darksky.net/dev
//after login we have our accounts secret key,this is a randomly generated string and we use this when we make an http request to darksky api by our node app.
//this help darksky to identify our account and keep track of how many request we make.
//to make http request we can do some different things like use the core node modules which is very low level and ohter is use of bunch of npm modules
//we first need to initialize weather app as an npm project by npm init then it ask for yes or no.
//so we use npm init -y which tell yes for every thing

const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const url =
  // "https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,-122.4233?units=si&lang=es";
  "https://api.pirateweather.net/forecast/KCoUwv8rF6Kk1MxgaQuHXvjaeIggoTQv/37.8267,-122.4233?units=si&lang=es";

// use request function to make request provide two arguments,the first is an option object which outline what we like to do that where we provide the url and other information
// the second argument is a function to run once we actually have that response
//there are chrome extension to see nice formatted data chrome extension json formattor
request({ url: url, json: true }, (error, response) => {
  //if we use json : true then we don't need to parse the response.body because it automatically parse and convert into an object.
  //   const data = JSON.parse(response.body);
  //   console.log(data.currently);
  // here the condition if we are not connected to internet then error handling but what when we have bad coordinates then we indeed get a response with two properties code and error and we need to add a little bit of defensive programming to make sure we print a useful error message to the user in this situation.
  //so when we have invalid input the server might response and it going to respond with data that might be considered an error but it not going to populate this error object. because the error in request is used for lower level of os things lik the complete lack of network connection.
  if (error) {
    console.log("Enable to connect the weather services");
  } else if (response.body.error) {
    console.log("Enable to find the Location");
  } else {
    //request module automatically pass the jason data ,we can do this by customizing the options object of jason:true
    console.log(response.body.currently);
    // it much easier to use the browser to explore what data i want to include fromm a json response.
    //we gonna use the chrome extension json formatter
    console.log(
      response.body.daily.data[0].summery +
        "It is currently" +
        response.body.currently.temperature +
        "degree out." +
        "There is a" +
        response.body.currently.precipProbability +
        "."
    );
  }
});
//we have exclude to leave of the forecase we arenot using to makeour response faster.we can use lang and units. we can set these by key value pair after the url by ? and separeted by &.

//now we learn how request automatically parse jason.

//jason in lower case can get set to equal to true or false.
//there are chrome extension out there though that allow you to see nice formatted data like chrome extension json formatter.

//Goal: Print a small forecast to the user

// 1. Print: "It is currently 58.55 degrees out. There is a 0% chance of rain."
// 2. Test your work!

//Geocoding it is process of taking and address and converting it into a latitude and longitude coordinate pair.
//use another http api which provide a geo coding serivce,it is process of taking address
//and converting that into latitude and longitude coordinates
// and then we gone pass them to darksky api to get weather information
//in end it required two http request to build out the weather app.
//we used mapbox.com to sort interesting location based seriveces
// Address --> lat/long --> weather
// mapbox provide a secret key that's going to allow it to track how many request we are actually making
// this api support two geocoding 1.forward and 2. reverse
// forward geo coding do change address into lang,lati while reverse do opposite.
//there are two required parameters 1.endpoint(we use mapbox.places this is main one and other is reserved for enterprise customer) and 2.search_text(here we provide address)
//they are using the curl command from the terminal to fetch the given end points.
// it start off with the base URL that is a https api mapbx.com then gecoding api with version 5 and then we provide the two required parameters the mapbox.places and then we have search term with .json to get json data back and then start with query string with keyvalue pair that is access token
// root of our geocoding is an object with four properties type,query,features,and attribution.
// query just lets us know what we provided like search terms that we provided via the URL.
// features array contain the interesting data we want to extract
//by default mapbox is going to return the five most relevant search result and the most relevent one come first .
// the coordinates are stored in features of center with two numbers first number that is the longitude and the second number latitude. and we extract these two values from the json response and pass to the dark sky api to fetch the eather for this location .
// we set limit =1 to fast access request.

// Goal: Print the lat/lang for  Los Angeles
//
//1. Fire off a new request to the URL explored in Browser
//2.Have the request module parse it as JSON
//3. Print both the latitude and longitude tothe terminal
//4.Test your work.

const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.ey";

request({ url: geocodeURL, json: true }, (error, response) => {
  // const latitude = response.body.features[0].center[1];
  // const longitude=response.body.features[0].center[0];
  // console.log(latitude,longitude);
  if (error) {
    console.log("Unable to connect to location services");
  } else if (response.body.features.length == 0) {
    console.log("Unable to find location. Try another search.");
  } else {
    console.log(
      response.body.features[0].center[1],
      response.body.features[0].center[0]
    );
  }
});

// Goal: Handle errors for gecoding request
//1. setup an error handler for low level errors
//2. Test by disabling network request and runninng the app
//3. Setup error handling for no matching result
//4. Test by altering the search term and running the app

//callback function(core of asynchronous nodejs development)

//we are going to create a function which is going to communicate the mapbox API.
// so for geocode we need address and and the other is a callback function which is called when we have latitude and longitude.

// const geocode = (address, callback) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     encodeURIComponent(address) +
//     ".json?access_token=pk.ey";
//   //now the entire url is going to be static except the one piece where the address goes
//   //remove the address and go to use single quotes and make a + operator and it divide it into two string and put the address between them. with pass this address through a function called encodeURIComponet();
//   // this function return a string and that going to get placed in url.
// we can put address directly but use the function because if some one use special characters that encode in function.

//   request({ url: url, json: true }, (error, response) => {
//     //the goal is to create the function highly usable so when someone calls geo code they might want to do sommething different
//     // with the error messange like to save it to alog file on the file system or send it to their system admin via an email
//     //so instead of logging out of the error ,we are going to pass it back to callback,and  the callback going to choose what to do
//     //like i could call geo code five different times and do five different thing with the error message so we are going to use callback function in if condition.

//     if (error) {
//       callback("Unable to connect to  location servies");
//       // callback("Unable to connect to  location servies", undefined);
//       // message is getting sent back to the caller and they choose to do what ever they want to make geo code as felxible as possible.
//       // the second value is undefined becuase we don't have data so we don't provide undefined because will the value automatically assigned by js.
//     } else if (response.body.features.length === 0) {
//       callback("Unable to find location. Try another search.", undefined);
//     } else {
//       callback(undefined, {
//         latitude: response.body.features[0].center[1],
//         longitude: response.body.features[0].center[0],
//         location: response.body.features[0].place_name,
//       });
//     }
//   });
// };

// // it is typical to see two arguments passed two callback and that exactly what we are gonna do here.
// //now we have to actually make sure that callback gets called with the correct arguments.
// //now making our request by taking the url and store in url variable.
geocode("Philadophia", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

//Goal: Create a reusable function for getting the forecast
//
//1. Setup the "forecast" function in utlis/forecat.js
//2. Require the function in app.js and call it as shown below
//3. The forecast function should have three potential calls to callback:
// - low level error, pass string for error
//- coordinate erro, pass string for error
// - Success, pass forecast string for data (same forecast as from before)

// const forecast = (latitude, longitude, callback) => {
//   const url = `https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/${latitude},${longitude}?units=si&lang=es`;

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect the weather services", undefined);
//     } else if (response.body.error) {
//       callback("Unable to find the location", undefined);
//     } else {
//       callback(undefined, {
//         weather: response.body.currently,
//       });
//     }
//   });
// };

forecast(12.234543, 233, 1234, (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

//now learn callback chaining(to one think then next)
// now in app.js we have two indedd asynchronous i/o operation

// both are operating completely independently of the other.
// below is code of calback chaining
// now we have to make sure that data property of geocode used as input of latitude and longitude for forcast function.\
const address = process.argv[2];

if (!address) {
  console.log("Please provide an Address");
} else {
  // geocode(address, (error, data) => {
  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return console.log(error);
    }
    // console.log("Error", error);
    // console.log("Data", data);
    // forecast(data.latitude, data.longitude, (error, forecastData) => {
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log("Error", error);
      }
      // console.log("Error", error);

      // console.log("Data", forecastData);
      // console.log(data.location);
      console.log(location);
      console.log(forecastData);
    });
  });
}
// console.log(process.argv);

//now the challenge is to do is to make sure that the user can actually provide the location
//Goal: Accept the location via command line argument
//1. Access the command line argument without yargs
//2. Use the string value as the input for gecode
//3. Only geocode if a location was provided
//4. Test your work with a couple locations.

// features of es6 that make much easier to workk with objects when it comes to creating objects

//Goal: Use both destructuring and property shorthand in weahter app
//1.use destructuring in app.js forecast.js and geocode.js
//2.Use property shorthand in forecast.js and geocode.js
//3.Test your work and ensure app still work
