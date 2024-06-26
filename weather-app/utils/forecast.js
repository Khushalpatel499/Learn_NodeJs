// const request = require("request");

// const forecast = (latitude, longitude, callback) => {
//   //   const url = `https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/${latitude},${longitude}?units=si&lang=es`;
//   const url =
//     "https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/" +
//     latitude +
//     "," +
//     longitude +
//     "?units=si&lang=es";

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect the weather services", undefined);
//     } else if (response.body.error) {
//       callback("Unable to find the location", undefined);
//     } else {
//       callback(
//         undefined,
//         response.body.daily.data[0].summery +
//           "It is currently" +
//           response.body.currently.temperature +
//           "degree out." +
//           "There is a" +
//           response.body.currently.precipProbability +
//           "."
//       );
//     }
//   });
// };

// module.exports = forecast;

const request = require("request");

const forecast = (latitude, longitude, callback) => {
  //   const url = `https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/${latitude},${longitude}?units=si&lang=es`;
  const url =
    // "https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/" +
    // latitude +
    // "," +
    // longitude +
    // "?units=si&lang=es";
    `https://api.pirateweather.net/forecast/KCoUwv8rF6Kk1MxgaQuHXvjaeIggoTQv/${latitude},${longitude}?units=si&lang=es`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect the weather services", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " ,It is currently " +
          body.currently.temperature +
          " degree out." +
          "There is a " +
          body.currently.precipProbability +
          " Chance of Rain" +
          "."
      );
    }
  });
};

module.exports = forecast;
