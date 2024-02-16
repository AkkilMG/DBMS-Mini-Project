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
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${new Date().toString()}: ${req.method}=> ${req.originalUrl}`);
    next();
});
app.use(bodyParser.json());
app.set('trust proxy', true);

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

// User Interface API routes
app.use("/api/auth", App)


server.listen(7000, () => console.log(`Server running at http://localhost:7000`));