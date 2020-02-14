# Places API (& UI)

The Places API is a NodeJs web application to manage places you have visited.  

It provides a REST API (& UI), where you can
- 

All data is stored in a [MongoDB](https://www.mongodb.com/).

### Configure the MongoDB Database Connection

The database connection is configured via environment variables.    
Create a `.env` file in the top level directory and set:  
```
MONGO_DB_USER=<user>
MONGO_DB_PASSWORD=<pw>
MONGO_DB_CONNECTIONSTRING=<connectionstring>
```
Make sure the file is excluded from git (see `.gitignore`). And not stored/pushed to the remote repository!

### Development

+ **1** First install the dependencies using npm (make sure you installed [NodeJs](https://nodejs.org/en/))
    ```
    npm install
    ```
+ **2** Choose:
  - **2a** Start a server with file watch hat restarts when changing files using nodemon:
    ```
    npm install -g nodemon
    nodemon app.js
    ```

  - **2b** Just start the server without watching files:
    ```
    npm run start
    ```
+ **3** Open Browser [http://localhost:8081](http://localhost:8081)

#### Packages used:

##### [express](https://github.com/expressjs/express/)

Express is a minimal and flexible NodeJs web application framework that provides a robust set of features to develop web applications. Some of the core features of Express framework:

- Set up middlewares to respond to HTTP Requests
  - E.g. serve static files from file system
- Define routes to map actions to HTTP Method and URL
- Dynamically render HTML Pages based on passing arguments to templates

##### [body-parser](https://github.com/expressjs/body-parser)

Body-parser is a NodeJs middleware for handling JSON, Raw, Text and URL encoded form data. It parses incoming request bodies in a middleware before the handlers and makes it available under the req.body property.

##### [mongoose](https://github.com/Automattic/mongoose/)

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

##### Other Utils used

**[dotenv](https://github.com/motdotla/dotenv)**: Loads environment variables (e.g. the database credentials) from `.env` file for NodeJs projects. For production mode the environment is configured by environment variables.    
**[cors](https://github.com/expressjs/cors)**: Configure [CORS](https://developer.mozilla.org/de/docs/Web/HTTP/CORS) Headers.  
**[nocache](https://github.com/helmetjs/nocache)**: Disable Caching for API Responses.  

### TODO:
- Better Validation Error handling
- Provide Swagger UI for API
- Refactor to use [NestJS](https://docs.nestjs.com/)
