## Dependencies

```
    body-parser
    cors
    dotenv
    express
    mongoose
```

*Dev dependency*
```
    nodemon
```

run `npm install` in root folder to install required dependencies <br/>

## Starting server

Create appropriate *.env* file in the root folder with **DB_URI** set as link to database and **PORT** set as desired port number. <br/><br/>
*`.env file`*
```
    DB_URI='<link_to_MongoDB_database>'
    PORT=8000
```
*(default PORT number is set to 8000)*

run `npx nodemon server.js` to start local backend server