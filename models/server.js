const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const routesModule = require('../routes/index');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

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

    async routes(){
        const routeParams = await routesModule.loadRoutes(__dirname.replace('models','routes'));
    
        routeParams.forEach((item) => {
            this.app.use(item.path,require(item.fileDir))
        })
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Listening in port ${this.port}`)
        })
    }
}

module.exports = Server;