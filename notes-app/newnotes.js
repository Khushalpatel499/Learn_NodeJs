const fs = require("fs");
const chalk = require("chalk");

// const getNotes = function () {
//   return "Your Notes..";
// };

const getNotes = () => "Your Notes..";

// for add new notes
const addNote = function (title, body) {
  //in starting we dont have data file and we don't have any code to read or write from the file system.
  //   first we hav to do is load in the existing notes
  //   we dont want to override the data ,we want to load in the existing one stored as jason

  const notes = loadNotes();
  //now prevent duplicate node to be added
  //we gonna used array filter method
  //we are going to store all the duplicate we find
  //filter method is going to return a subset of the notes array
  // depends on how many match our criteria by setting a function this function call one time for each note,it return true or false ,
  //true mean filer keep indivdual note in the array calling it a duplicate,if false filter is not keep that in the array saying its not a duplicate.
  // we dont want to type out boolean explicitly ,we gone use conditional logic,after that the function run twice if note.title===title it return true means we have duplicate
  // so if no duplicate than duplicateNotes have 0 items.
  // const duplicateNotes = notes.filter(function (note) {
  //   return note.title === title;
  // });

  //filter check each element if it find duplicate or not
  //filter return an array of matches  and the find method returns the first match it find if any other wise it return undefined
  // const duplicateNotes = notes.filter((note) => {
  //   return note.title === title;
  // });

  const duplicateNote = notes.find((note) => {
    return note.title === title;
  });
  //now write if statement
  // debugger;
  if (!duplicateNote) {
    // or if(duplicate === undefined)
    // if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }

  //   notes.push({
  //     title: title,
  //     body: body,
  //   });
  //now we load the data and add data in array now we have to save the data
  //now we are saving data from multiple places in our application  so we going to create a little reusable function and it going to take the array
  //   console.log(notes);
  //   saveNotes(notes);
};

// to save the data
const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
//to load the notes
const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    //if try code note run then return and empty array
    // and after that we used this array to add data.
    return [];
  }

  //now read from file
  //   const dataBuffer = fs.readFileSync("notes.json");
  //   const dataJSON = dataBuffer.toString();
  //   return JSON.parse(dataJSON);
  //it going to fail if no file or the file doesnt contain jason
  // so we have two ways one create that file or two we could write defensive code that knows how to work.
  // so to do this we gonna used js try catch statement.
};

//remove a note

//Challenge: Wire up removeNote
//1.Load existing notes
//2.Use array filter method to remove the matching note (if any)
//3.Save the newly created array
//4. Test your work with a title that exists and a title that doesn't exist

const removeNote = function (title) {
  //   console.log(title);
  //load notes
  const notes = loadNotes();
  // check for matching notes
  const keepNote = notes.filter(function (note) {
    return note.title !== title;
  });
  // saveNotes(keepNote);
  if (notes.length > keepNote.length) {
    console.log(chalk.green.inverse("Note removed! "));
    saveNotes(keepNote);
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

//Goal: Wire up list command
//
//1. Create and export listNotes fromm ntoes.js
//   "your notes"  using chalk
//  print note title for each note
// 2. Call listNotes from command handler
// 3. Test your work

//list

const listNotes = (title) => {
  const notes = loadNotes();
  console.log(chalk.green.inverse("Your Notes"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

// Goal: Wire up read command
//
//1. Setup --title option for read command
//2. Create readNote in notes.js
//         search for note by title
//         find note and print title (styled) and body (plain)
//         No note found ? Print error in red.
//3. Have the command handler call the function
//4. Test your work by running a couple commands.

const readNote = (title) => {
  const notes = loadNotes();
  const findNote = notes.find((note) => note.title === title);
  if (findNote) {
    console.log(
      "title:" + chalk.inverse(findNote.title),
      "Body:" + findNote.body
    );
  } else {
    console.log(chalk.red.inverse("NO note is found"));
  }
};

// for multiple access of function in newnotes.js to finalapp.js we set an object to export
module.exports = {
  // property: function
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
