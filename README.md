##CS326 NinjaShare
Mayu Kudo
----------
+ app.js -> File to execute the application
lib/
+ index.js -> Implementing custom errors/dynamicHelpers/loginRequired etc
models/
+ index.js -> Connection handlers/models for MongoDB using mongoose
package.json -> Sets all dependencies
public/
  images/
  javascripts/
     + client.js -> For websocket
     + jquery files
  stylesheets/
     + style.css -> Stylesheet for this repo
routes/
  + index.js -> Retrives ./topics and exports
  + new.js -> Renders to new.ejs with a title
  + auth.js -> Login/Signup/Login
views/
  + errors.ejs -> If error object was a NotFound instance, renders err.ejs, else pass it to next error handler
  + index.ejs -> Index which shows the 'welcome to title' message
  + layout.ejs -> Layout of the main website
  + err.ejs -> Layout of the error page
  + new.ejs -> Layout of the signup/login page

## Before compiling
1) Download a zipfile
2) Decompress it
3) Go inside the folder, and type in
```sh
$ sudo npm install
```
4) Make sure you have 'socket.io', 'mongoose', 'connect-flash', and 'model' in your node_modules

5) Run your application

```
$ sudo node app.js
```

Then access to 
[http://localhost:3003/](localhost:3003).
It is important to run node using sudo, because if you didn't, you might get the socket error.

If you get module errors, try

```sh
$ npm cache clean
$ npm install
```

This will change your local setup. Then rerun node.


## References
