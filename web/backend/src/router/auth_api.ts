/**
 * @name: Akkil M G
 * @description: App router
 * @copyright: AkkilMG (c) 2022
 */

import express from "express";


const router = express.Router();

router.get("/", async(req, res) => {
    try {
        // var info = req.params.info;
        var data = req.body;
        return res.status(200).json({ success: true });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message })
    }
});

export const App = router;