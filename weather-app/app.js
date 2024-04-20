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

const url =
  "https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,-122.4233?units=si&lang=es";

// use request function to make request provide two arguments,the first is an option object which outline what we like to do that where we provide the url and other information
// the second argument is a function to run once we actually have that response

request({ url: url, json: true }, (error, response) => {
  //   const data = JSON.parse(response.body);
  //   console.log(data.currently);
  console.log(response.body.currently);
  console.log(
    response.body.daily.data[0].summery +
      "It is currently" +
      response.body.currently.temperature +
      "degree out." +
      "There is a" +
      response.body.currently.precipProbability +
      "."
  );
});

//now we learn how request automatically parse jason.

//jason in lower case can get set to equal to true or false.
//there are chrome extension out there though that allow you to see nice formatted data like chrome extension json formatter.

//Goal: Print a small forecast to the user

// 1. Print: "It is currently 58.55 degrees out. There is a 0% chance of rain."
// 2. Test your work!

//use another http api which provide a geo coding serivce,it is process of taking address
//and converting that into latitude and longitude coordinates
// and then we gone pass them to darksky api to get weather information
//in end it required two http request to build out the weather app.
//we used mapbox.com to sort interesting location based seriveces
