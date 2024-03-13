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
import { Police } from "./router/police_api";
import { Auth } from './router/auth_api';

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

app.use(cors({
    origin: '*', // process.env.DOMAIN,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers'],
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //process.env.DOMAIN);
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers'); 
    next();
});

var server = http.createServer(app);

app.get("/", async(req, res) => {
    res.status(200).json({success: true})
    return
})

// User Interface API routes
app.use("/api/auth", Auth)

// Police Interface API routes
app.use("/api/police", Police)

server.listen(7000, () => console.log(`Server running at http://localhost:7000`));