/**
 * @name: Akkil M G
 * @description: Auth router
 * @copyright: AkkilMG (c) 2022
 */

import express from "express";
import { UserModel } from "../workers/model";
import { ChangePassword, DeleteUser, ShowAllUser, ShowUser, Signin, Signup } from "../database/database";
import { verifyToken } from "../workers/auth";


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

router.post("/change-password", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await ChangePassword(data.UserID, data.password);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.post("/delete-user", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await DeleteUser(data.UserID);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.post("/user", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await ShowUser(data.UserID);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.post("/users", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await ShowAllUser(data.UserID);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

export const Auth = router;