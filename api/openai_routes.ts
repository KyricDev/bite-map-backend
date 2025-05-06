import { Router } from "express";

const openaiRoutes = [
    Router().post('/query', (req, res) => {
        const body = req.body;

        res.json({
            "message": "success"
        })
    })
];

export {
    openaiRoutes
}