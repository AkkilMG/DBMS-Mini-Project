/**
 * @name: Akkil M G
 * @description: Police router
 * @copyright: AkkilMG (c) 2022
 */

import express from "express";
import { verifyToken } from "../workers/auth";
import { CreateEvidence, CreateReport } from "../database/database";


const router = express.Router();

router.post("/reporting", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await CreateReport(data)
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});


router.post("/evidence", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await CreateEvidence(data)
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

export const Police = router;