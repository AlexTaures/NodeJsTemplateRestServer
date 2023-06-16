const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth'

        //Connect to DB
        this.connectDB();

        //MiddleWares
        this.middlewares();

        //App routes
        this.routes();
    }

    //Connect DB from database->config.js
    async connectDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        // Parse and read from body
        this.app.use(express.json());
        
        //Public Directory
        this.app.use(express.static('public'));
        
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth')) 
        this.app.use(this.usersPath, require('../routes/user')) //import the user project routes
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Listening in port ${this.port}`)
        })
    }
}

module.exports = Server;