/**
 * @name: Akkil M G
 * @description: App router
 * @copyright: AkkilMG (c) 2022
 */

import express from "express";
import { verifyToken } from "../workers/auth";
import { CreateEvidence } from "../database/database";


const router = express.Router();

router.post("/case-reporting", verifyToken, async(req, res) => {
    try {
        var data = req.body;

        return res.status(200).json({ success: true });
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