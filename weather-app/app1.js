const request = require("request");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forecast");

// const url =
//   //   "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=521854d86396e37a10b9a7950d4bdd78&units=imperial&lang=fr";
//   "https://api.pirateweather.net/forecast/KCoUwv8rF6Kk1MxgaQuHXvjaeIggoTQv/37.8267,-122.4233?units=si&lang=es";

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Enable to connect the weather services");
//   } else if (response.body.error) {
//     console.log("Enable to find the Location");
//   } else {
//     //   const data = JSON.parse(response.body);
//     //   console.log(data.currently);
//     //   console.log(response.body.list[0]);
//     console.log(
//       `It is ${response.body.daily.data[0].summary} .It is currently ${response.body.currently.temperature} degree out. There is ${response.body.currently.precipProbability}  of chance of rain`
//     );
//   }
//   //   console.log(response);
// });

// //Goal: Print a small forecast to the user.
// //
// //1. Print; "It is currently 58.50 degree out. There is 0% of chance of rain"
// //2.Test your work.

// // Goal: Print the lat/long for Los Angles

// // 1.Fire off a new request to the URL explored in browser
// // 2. Have the request module parse it as JSON
// // 3.Print both the latitude and longitude to the terminal
// // 4.test your work

// const geocodeURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia2h1c2hhbDciLCJhIjoiY2x3bjZpYXF6MG5ncDJqcnphNHVqMnlwMyJ9.Rkigo0TFoYrqvqCisqnjtQ&limit=1";

// request({ url: geocodeURL, json: true }, (error, response) => {
//   if (error) {
//     console.log("Enable to connect the weather services");
//   } else if (response.body.error) {
//     console.log("Enable to find the Location");
//   } else {
//     const longitude = response.body.features[0].center[0];
//     const latitude = response.body.features[0].center[1];
//     console.log(latitude, longitude);
//     // below we create it without using our function it can be terriable becuase it is so nested
//     //     const url =
//     //   //   "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=521854d86396e37a10b9a7950d4bdd78&units=imperial&lang=fr";
//     //   "https://api.pirateweather.net/forecast/KCoUwv8rF6Kk1MxgaQuHXvjaeIggoTQv/37.8267,-122.4233?units=si&lang=es";

//     // request({ url: url, json: true }, (error, response) => {
//     //   if (error) {
//     //     console.log("Enable to connect the weather services");
//     //   } else if (response.body.error) {
//     //     console.log("Enable to find the Location");
//     //   } else {
//     //     //   const data = JSON.parse(response.body);
//     //     //   console.log(data.currently);
//     //     //   console.log(response.body.list[0]);
//     //     console.log(
//     //       `It is ${response.body.daily.data[0].summary} .It is currently ${response.body.currently.temperature} degree out. There is ${response.body.currently.precipProbability}  of chance of rain`
//     //     );
//     //   }
//     //   //   console.log(response);
//     // });
//   }
// });

// const forcast = (latitude, longitude, callback) => {
//   const url = `https://api.pirateweather.net/forecast/KCoUwv8rF6Kk1MxgaQuHXvjaeIggoTQv/${latitude},${longitude}?units=si&lang=es`;

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect the weather services", undefined);
//     } else if (response.body.error) {
//       callback("Unable to find the location,Try another search", undefined);
//     } else {
//       callback(undefined, {
//         weather: response.body.currently.temperature,
//       });
//     }
//   });
// };

// const geocode = (address, callback) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     encodeURIComponent(address) +
//     ".json?access_token=pk.eyJ1Ijoia2h1c2hhbDciLCJhIjoiY2x3bjZpYXF6MG5ncDJqcnphNHVqMnlwMyJ9.Rkigo0TFoYrqvqCisqnjtQ&limit=1";

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to location services", undefined);
//     } else if (response.body.features.length === 0) {
//       callback("Unable to find location,Try another search", undefined);
//     } else {
//       callback(undefined, {
//         longitude: response.body.features[0].center[0],
//         latitude: response.body.features[0].center[1],
//         location: response.body.features[0].text,
//       });
//     }
//   });
// };

// geocode("India", (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

// forcast(22.1991660760527, 78.476681027237, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

//Now use callback chaining
console.log(process.argv);
const address = process.argv[2];
if (!address) {
  console.log("Please provide the address");
} else {
  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return console.log(error);
    }

    forcast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log(location);
      console.log(forecastData);
    });
  });
}
