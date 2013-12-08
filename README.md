##CS326 Share Ninja
Emily Henriksen, Nick Hirakawa, David Itkin, Mayu Kudo, Christopher B. Paika

## Before compiling
1) Download a zipfile
2) Decompress it
3) Go inside the folder, and type in
```sh
$ sudo npm install
```
4) Make sure you have 'connect', 'connect-redis', 'ejs', 'express', 'mongoose', and 'connect-flash' in your node_modules

5) Set up redis (for Mac with developer tools. If you haven't downloaded developer tools with XCode please do so before you run the lines below)
 ```
$ wget http://download.redis.io/redis-stable.tar.gz
$ tar xvzf redis-stable.tar.gz
$ cd redis-stable
$ make
$ sudo make install
$ redis-server
 ```
 For Windows users, go to [https://github.com/rgl/redis/downloads](redis downloads) for more information. It may be easier for users to have the redis-server folder inside the this repo, unless you want to run this repo over and over.


6) Open a new terminal, then prepare for MongoDB (for Mac, use Homebrew)

```
$ brew install mongodb
$ mkdir ~/Library/mongodb/data
$ cd ~/Library/mongodb/bin
$ ./mongod --dbpath=/Users/(yourusername)/Library/mongodb/data &
```
Installing MongoDB on Windows, Ubuntu, Linux, instruction can be found on [http://docs.mongodb.org/manual/tutorial/](tutorial)

7) Open up a new terminal, run
```
$ sudo node app.js
```

Then access to 
[http://localhost:3000/](localhost:3000).
It is important to run node using sudo, because if you didn't, you might get the socket error.

If you get module errors, try

```sh
$ npm cache clean
$ npm install
```

This will change your local setup. Then rerun node.



When you want to stop redis-server, do
```
$ killall -SIGTERM redis-server
$ redis-server - stop
```

## References
