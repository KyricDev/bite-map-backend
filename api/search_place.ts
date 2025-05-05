import { Router } from "express";

const searchRoutes = [
    Router().post('/search', (req, res) => {
        const body = req.body;

        res.json({
            'message': 'done',
        })
    })
];

export {
    searchRoutes
}