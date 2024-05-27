//threre are two core modules that we are going to explore we can find those on nodejs documenttation.
//we gonna see Http and https
// here we can see that there are separate module depending on the protocol we are using while in request that is not neccassary.
//we can use these libraries to create a new server.
// we can also use these modules to make request to an existing server
// so we use http module for standard request and we use https module to making a reqestt to a secure server.
// now in our case both of our api do use https protocol.

const https = require("https");
const url =
  "https://api.pirateweather.net/forecast/KCoUwv8rF6Kk1MxgaQuHXvjaeIggoTQv/40,-75?units=si&lang=es";

//we pass in a https.reqest with two arguments a url and a callback function.
// the callback we used here is very different from the callback we used in forcast and geocode because our core node modules typically operate at a lower level.
// here in this callback we don't have access to complete response body.
// instead we ca go ahead and grab the individual chunks tht come through  becuase http data stramed in mupltipe parts.
// it means we have to listen for these individual chunks to come in, and we also have to listen for when all chunks have arrived and the request is done.
//response.on() is a function that allow us to register a handler, there are different events we can register , callback functions for one of them is data.
//we provide event name as the first argument represented as a string and from here we can also provide the callback and  that going to fire when new data comes in and we get access to that data.
// and the first argument commonly called chunk so this is a chunk of the response it might be entire thing or might not depending on exactly how the server has been setup.
// now other thing is we figure out when we done, we can do using another call to response.on(), here we are waiting for the end event when things are over.
// this callaback function is going to run and it doesn't get any arguments, instead by running we just know we are done.
// so now put these two together to figure out how we can get the entire response body pass it form jason to a js object and actually use it.
const request = https.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data = data + chunk.toString();
    // console.log(chunk);
  });

  response.on("end", () => {
    // console.log(data);
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();

// first response.on() callaback of chunck get fire when data comes in , now this could happen one time or it could happen multiple times.

// so we need to take this chunk, we need to add it somewhere where we can store it untill we have all of them then we can pass it as json
// so we create a variable
// if we run this code it stuck because we don't have a complete request.
// there is another method we need to use to say we atually ready to send this off to do that.
// what we get back from the request method is what you could refer to as the request itself.
// now finally we use request.end() to  kick things off.
// now if we run we can see  that few different console log call priting vairous buffer
// so the chunk data come back is indeed a buffer, but we want a string
// we also have to error handle
