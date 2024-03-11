const newnotes = require("./newnotes.js");
const yargs = require("yargs");

// challenge: setup commmand option and function
//1. setup the remove command to take a required "--title" option
//2. Create and export a removeNote function from notes.js
//3. Call removeNote in remove command hanlder
//4.Have removeNote log the title of the note to be removed
//5. Test your work using: node app.js remove --title "some title"

//add new notes
yargs.command({
  command: "add",
  describe: "add new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    newnotes.addNote(argv.title, argv.body);
  },
});
// yargs.parse();

//remove note
yargs.command({
  command: "remove",
  describe: "remove the node",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  // handler: function (argv) {
  //   newnotes.removeNote(argv.title);
  // },
  handler(argv) {
    newnotes.removeNote(argv.title);
  },
});
// yargs.parse();

//list

yargs.command({
  command: "list",
  describe: "Show the list",
  handler(argv) {
    newnotes.listNotes(argv.title);
  },
});

//read

yargs.command({
  command: "read",
  describe: "read the note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    newnotes.readNote(argv.title);
  },
});

yargs.parse();
//
//Goal: Refactor all functions
//
//1. If function is a method, ude ES6 method definition syntax
//2. Otherwise, use most concise arrow function possible
//3. Test your work!
