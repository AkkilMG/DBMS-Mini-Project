/**
 * @name: Akkil M G
 * @description: Auth router
 * @copyright: AkkilMG (c) 2022
 */

import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../workers/model";
import { ChangePassword, DeleteUser, GetRecentCases, ShowAllUser, ShowUser, Signin, Signup, Statistics, isAdmin } from "../database/database";
import { verifyToken } from "../workers/auth";
import { decrypt } from "../workers/crypt";


const router = express.Router();

router.get("/check-token", async(req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.KEY) as { id: string };
        console.log(decoded)
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false });
    }
});

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

router.post("/change-password", async(req, res) => {
    try {
        var data = req.body;
        var result = await ChangePassword(data.Email, data.Password);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.post("/delete-user", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await DeleteUser(data.UserID, data.DelUserID);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.get("/user", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await ShowUser(data.UserID);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.get("/users", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await ShowAllUser(data.UserID);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.get("/recent-cases", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await GetRecentCases(data.UserID);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.get("/check-admin", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await isAdmin(data.UserID);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
})

router.get("/statistics", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await Statistics(data.UserID);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
})

export const Auth = router;