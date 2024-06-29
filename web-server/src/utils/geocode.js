// const request = require("request");

// const geocode = (address, callback) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     encodeURIComponent(address) +
//     ".json?access_token=pk.ey";
//   //now the entire url is going to be static except the one piece where the address goes
//   //remove the address and go to use single quotes and make a + operator and it divide it into two string and put the address between them. with pass this address through a function called encodeURIComponet();
//   // this function return a string and that going to get placed in url.

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

// module.exports = geocode;

const request = require("request");

const geocode = (address, callback) => {
  const url =
    // "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    // encodeURIComponent(address) +
    // ".json?access_token=pk.ey";
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoia2h1c2hhbDciLCJhIjoiY2x3bjZpYXF6MG5ncDJqcnphNHVqMnlwMyJ9.Rkigo0TFoYrqvqCisqnjtQ&limit=1";
  //now the entire url is going to be static except the one piece where the address goes
  //remove the address and go to use single quotes and make a + operator and it divide it into two string and put the address between them. with pass this address through a function called encodeURIComponet();
  // this function return a string and that going to get placed in url.

  request({ url, json: true }, (error, { body }) => {
    //the goal is to create the function highly usable so when someone calls geo code they might want to do sommething different
    // with the error messange like to save it to alog file on the file system or send it to their system admin via an email
    //so instead of logging out of the error ,we are going to pass it back to callback,and  the callback going to choose what to do
    //like i could call geo code five different times and do five different thing with the error message so we are going to use callback function in if condition.

    if (error) {
      callback("Unable to connect to  location servies");
      // callback("Unable to connect to  location servies", undefined);
      // message is getting sent back to the caller and they choose to do what ever they want to make geo code as felxible as possible.
      // the second value is undefined becuase we don't have data so we don't provide undefined because will the value automatically assigned by js.
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

// it is typical to see two arguments passed two callback and that exactly what we are gonna do here.
//now we have to actually make sure that callback gets called with the correct arguments.
//now making our request by taking the url and store in url variable.

module.exports = geocode;
