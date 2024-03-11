// const square = function (x) {
//   return x + x;
// };
// console.log(square(3));

//using arrow functions

// const square = (x) => {
//   return x + x;
// };

// console.log(square(3));

const square = (x) => x + x;
console.log(square(3));

// arrow function in cotext of methods so arrow functions as properties on an object.

const event = {
  name: "Birthday Party",
  //   printGuestList: () => {
  //     // for arrow this give output that the guest list for undefined beacuse arrow function they don't bind their own this value
  //     //which means we don't have access to this as a reference to this object so use standard function
  //     //but in es6 we still having access to standard function features like a this binding by remove the function keyword and remove the colon
  //     console.log("GUest list for" + this.name);
  //   },
  guestList: ["Andrew", "Jen", "Mike"],
  printGuestList() {
    // const that =this; // in early days of js to create a reference, that we use that
    console.log("Guest list for" + this.name);
    // this.guestList.forEach(function (guest) {
    //   //here the standard function has their own this binding, but we want to aceess this binding of its parent function, but now we use arrow function
    //   console.log(guest + "is attending" + this.name);
    // });
    // arrow function don't bind their own this value.they access this value in the context in which they created,here it inside of printguestlist
    this.guestList.forEach((guest) => {
      //here the standard function has their own this binding, but we want to aceess this binding of its parent function, but now we use arrow function
      console.log(guest + "is attending " + this.name);
    });
  },
};

event.printGuestList();
