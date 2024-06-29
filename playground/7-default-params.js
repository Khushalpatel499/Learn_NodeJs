const greeter = (name = "user", age) => {
  console.log("Hello" + name);
};
greeter("Andrew");
greeter();

//when i pass no argument it get not crashed it show hello undefined.because that is the default value of a function paramaeter.
