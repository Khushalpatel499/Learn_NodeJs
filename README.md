# Learn_NodeJs

1.Before node, js is just used as general programming language, it is limited to what browser allow to do. There is no way to use js outside of brwoser to build other things. (like webservers which access the files system and connect to database) 2.by using nodejs js can used on the server side to create webservers commands line interfaces appliction back ends. 3.Nodejs is a js runtime built on chrome v8 js engine(work of js engine to take code and compile it down to machine code that our machine can execute).
4.Both chrome and nodejs largely written
in c++.Nodejs is not a programming language,the runtime is something that provides custom functionality so various tools and libraries specific to an environment.(both chrome and nodejs are just creating their own modified version of js). 5. basically we have chrome it used v8 js engine to run js for a webpage same for node.v8 written in c++. 6.
both chrome and node written mostly in c++ which allow them to create their own js runtime features,like chrome interact with the dom when the dom is not part of js, node to interact with file system when the file system is not part of js either.

7.command for node version : node -v 8. command for clear terminal : cls or clear

9. to run indvidual run node statement command: node
   which is called REPL called read evalute Print and loop
   10.chrome have variable window while node have variable global,(similary chrome has document and node has process.it helps us to manipulate the process that running). 11. process is an object and exit is an method by use process.exit() we exist and back to standard terminal.

10. Node.js uses an event-driven, non-blocking i/o model that makes it lightweight and efficient.(node application use i/o to communicate to outside of world, non blocking means it can do parallel processes ,it is non blocking actually from browser )
    11.Node.js package ecosystem,npm,is the largest ecosystem of open source libraries in the world.

11. MOst fundamental feature of node is node module(libraries) system, some are used for globally like console and other require us to actually load them.
12. we use the file system module which allow us to access the operating system files, we will able to read and write append files and figure out if a file or directory exists.
13. synchronous means blocking architecutre and asynchronous means non blocking architecture.

14.importing npm module we take two steps:
a. we have to initialize NPM in our project.(which means we have to run a single command from the project root directory)
b second is we actually install all the module we needed.

15. when we install node we also got access to the npm command line tools.

16. to initialize npm in our project used command : npm init
    it create a single configuration file that we can use to manage all of the dependencies from the npm website that we want to install

    it create a json file which contain all detail in double quotes.
    so in this file we going to list out all ofthe npm packages we want to use to start
    we going to install the very popular validator package which gives us all sorts of tool to perform data validation.

17. if you want to perform a little validation in your app there are two ways first is to be write all of the validation code yourself,maintain it and write test cases and keep up with that code as node progresses over time. other way is to take advantages of other packages that allow us to get it done in much more secure way.
    validating pacakge has tool to validate emails,urls,phone number,social security number, credit card and other type of string information.
    command : npm install validator@latestversionnummber or npm i validator@latestversionnummber
    i stand for install shortcut

    after running we get two thing first .json and new directory node_modules(it contain all of the code for the dependencies we have installed)

18. when we dowload repo from git it not contain node_module so for run the app we first use command :npm install
    it command basically look at the contents of package lock josan and package jason to determine which dependencies and which version our application is using. it going to recreate that modules folder from scratch .
19. other npm package is chalk it is a little utility that allows us to customize how text gets printed to the console when working with node.

//debugging nodejs

1. exploring the node debugger which integrate directly with the chrome developer tools
   2.in generally there are two type of errors
   a. explict error message : type error
   b. no error message : sort of logic problem

2. Most basic tool is the console.log() for dubgging
3. but the better is node debugger and that is node built in debugging tool which integrates with v8 and chrome browser
4. if we want to pause program we use a debugger that gonna stop the application at this point
5. when we have the debugger in our application they are not going to pause the program by default,we have to run node with a special option to get that done command: node inspect app.js add.js add --title="hello" --body="nice"
   6.node debugger its using the built in the v8 debugger tool.
