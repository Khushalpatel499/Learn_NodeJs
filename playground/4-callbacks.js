// a callback function a is nothing more than a function we provide as an argument to another function with the intention of having it called later on.
setTimeout(() => {
  console.log("Two seconds are up");
}, 2000);

//we are using the callback pattern in an asynchronus way, we know that
// settimeout is an node provided api and it is indeed a synchronous.
// now that doesnot mean every time we use the callback pattern its actually a synchronous
//we know that settimeout uses the callback pattern and its asynchronous and we know that our array methods like for each and filter use the callback pattern but they are indeed synchronous.

//goal is to use callback with filter
// we use the filter function  and we are going to provide a callback function and passing an another function.

const names = ["khushal", "rahul", "mohit"];
const shortNames = names.filter((name) => {
  return name.length <= 5;
});

// in above case we are indeed using the callback pattern as well but there is nothing asynchronous about filter ,
//it not interacting with a native node API it is just standard javascript  code completly synchronous.
// here we used the callback pattern is when we are working with the function that we never define, we pass a callback to settimeout this is nodejs api and we passed callback to filter also not deffined by us, that comes from js.
// imagine in app.js program there are four different places where i want to be able to take a location and get the coordinates back for that i have to copy the geocode 4 times on different position in app.js. thats not ideal.
//we would create a function called GEO code or something like it and all of these code would go inside of there.

// const geocode = (address, callback) => {
//   const data = {
//     latitude: 0,
//     longitude: 0,
//   };
//   return data;
//   //now the goal is to give it back to the caller of geo code.
// };
// //now there are two ways to get this done
// //1. it could be the return value from the geocode.
// //2. we provide a callback and get the data there.
// const data = geocode("Philadelphia");
// console.log(data);
//the problem here is that there is nothing happening asynchronous inside .
//we gonna take all of the code inside of the GEO code function.

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0,
    };
    // return data;
    callback(data);
  }, 2000);
};

// const data = geocode("Philadelphia");
// console.log(data);
//now we show that undefined printing
// means the geocode function not returing anything.
// there is a single settimeout and no return statment directly inside of geo code.
//so geocode finishes immediately.
// if we don't return  something from a function we know that js will implicitly return fuction
//there is return statement but it is nested inside
//so the return pattern is no longer going to work for us when we start to do asynchronous thing inside
//that what the callback pattern is gong to come into play.
//so the change our code to use calback and get it back to a working state.

geocode("Philadelphia", (data) => {
  console.log(data);
});
// instead of returning of data we are gonna go ahead and call the callback function passing the data in as that first argument.
//if we are calling the callback with data as the first argument that means we are calling this function(geocode()) with data as the first argumnet.

//so if our function is completely synchronous like geo code was before we are able to use return to get the value out of the function and back to the part of the code that called that functon when our function
// starts to do something asynchronous though that's no longer option so instead of return a value we take a call back in and we call the callback with the value we want send back when we have it.

//Goal:mess around with the callback pattern

//1. Define an add function that accepts the correct arguments.
//3. Use settimeout to simulate a 2 second delay.
//3. After 2 seocnd are up, call the callback function with the sum
//4.Test your

const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
    // return ;
    // i can't use return here beacuse i am returning from this inner function not from add, instead of using return i will call callback
  }, 2000);
};
add(1, 4, (sum) => {
  console.log(sum);
});
//we seen it used with set time now to simulate the asynchronous process.

//now we are going to create the htttp request inside of the function.
// it allow us to do make it easy to create code that is reusable and easy to maintain by having separate functions we can call,we can run this code as many times as we need without copying it over and over again.
// other thing is that it's going to make it much easier to do one thing before or after something else.
// in our case we first geocode the address then i want to take the output the latitude and longitude and use that to fetch the weather.
//we could do this without creating our own functions but it would be pretty terrible
//in app.js we have two separate request which are currently not communicating with one another
// fix by creating the function.
