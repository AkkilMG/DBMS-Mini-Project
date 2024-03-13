/**
 * @name: Akkil M G
 * @description: Police router
 * @copyright: AkkilMG (c) 2022
 */

import express from "express";
import { verifyToken } from "../workers/auth";
import { CreateEvidence, CreateReport, ShowAllReport, ShowEvidence, ShowReport, UpdateEvidence } from "../database/database";


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

router.post("/report", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await ShowReport(data.CaseID)
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.post("/reports", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await ShowAllReport(data.UserID)
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

router.post("/update-evidence", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await UpdateEvidence(data.EvidenceID, data)
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

router.post("/show-evidence", verifyToken, async(req, res) => {
    try {
        var data = req.body;
        var result = await ShowEvidence(data.EvidenceID)
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

export const Police = router;