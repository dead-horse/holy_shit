#holy_shit
[![travis-ci](https://secure.travis-ci.org/dead-horse/holy_shit.png)](https://travis-ci.org/dead-horse/holy_shit)
[![Coverage Status](https://coveralls.io/repos/dead-horse/holy_shit/badge.png)](https://coveralls.io/r/dead-horse/holy_shit)

## How to run it  

```
$ make install
$ node dispatch.js
```

## How to change the config  

create `config.js` in config folder, all properties in `config/config.js` will be merge into `config/index.js` and cover the same properties in it.  

sample config.js:  

```js
module.exports = {
  webPort: '7002', //listen port 7002 instead of 7001
  debug: false     //do not use `debug`
};

```

## Project file  

```
$ tree
├── Makefile  # use make to run the install and test
├── api_routes.js  # all the json api routes
├── app.js  # http server start file
├── common # service folder
│   ├── logger.js
│   └── mysql.js
├── config # config folder
│   └── index.js
├── controllers
│   ├── api
│   │   └── posts.js
│   ├── common.js
│   ├── home.js
│   └── list_page.js
├── dispatch.js # use node dispatch.js to start the service
├── lib
│   └── utils.js
├── package.json
├── proxy # all the model files
│   └── posts.js
├── public
│   ├── css
│   │   ├── base.css
│   │   ├── common.css
│   │   └── pages
│   │       └── list.css
│   ├── img
│   │   └── loading.gif
│   └── js
│       ├── base.js
│       ├── lib
│       │   ├── ejs.js
│       │   └── gesture.js
│       ├── pages
│       │   └── list.js
│       └── utils.js
├── routes.js # page routes
├── test
│   ├── controllers
│   │   ├── api
│   │   │   └── posts.test.js
│   │   └── home.test.js
│   └── proxy
│       └── posts.test.js
├── views
│   ├── home.html
│   ├── layout.html
│   └── list_page.html
└── worker.js
```

## Authors  

```
$ git summary 

 project  : holy_shit
 repo age : 2 days ago
 commits  : 13
 active   : 6 days
 files    : 35
 authors  : 
     9  dead_horse              69.2%
     3  巴思                  23.1%
     1  rockdai                 7.7%
```