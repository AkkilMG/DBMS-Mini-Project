/**
 * @name: Akkil M G
 * @description: Notification router
 * @copyright: AkkilMG (c) 2022
 */

import express from "express";
import { verifyToken } from "../workers/auth";

const router = express.Router();

router.post("/reporting", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        return res.status(200).json({});
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

export const Notify = router;
