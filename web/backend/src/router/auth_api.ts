/**
 * @name: Akkil M G
 * @description: Auth router
 * @copyright: AkkilMG (c) 2022
 */

import express from "express";
import { UserModel } from "../workers/model";
import { Signin, Signup } from "../database/database";


const router = express.Router();

router.post("/signup", async(req, res) => {
    try {
        var data: UserModel = req.body;
        var result = await Signup(data);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.post("/signin", async(req, res) => {
    try {
        var data = req.body;
        var result = await Signin(data);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

export const Auth = router;