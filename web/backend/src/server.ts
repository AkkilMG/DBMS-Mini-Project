/**
 * @name: Akkil M G
 * @description: Server which integrate many routes
 * @copyright: AkkilMG (c) 2022
 */

import express from 'express';
import fs from 'fs';
// import https from 'https';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { App } from "./router/app_api";

require('dotenv').config();


const app = express();

app.use(express.json())

app.use(cors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers'],
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers'); 
    next();
});

app.set('trust proxy', true);
app.use(bodyParser.json());

// var server;
// if (process.env.PRODUCTION==="true") {
//     const privateKey = fs.readFileSync('/etc/letsencrypt/live/domain.com/privkey.pem', 'utf8');
//     const certificate = fs.readFileSync('/etc/letsencrypt/live/domain.com/fullchain.pem', 'utf8');
        
//     const credentials = { key: privateKey, cert: certificate };
//     server = https.createServer(credentials, app);
// } else {
//     server = http.createServer(app);
// }
var server = http.createServer(app);

app.get("/", async(req, res) => {
    res.status(200).json({success: true})
    return
})

// User Interface API routes
app.use("/api/app", App)


server.listen(7000, () => console.log(`Server running at http://localhost:7000`));