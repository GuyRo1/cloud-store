import express from 'express';
import cors from 'cors';

export const createServer = () => {
    const app = express();
    app.use(cors());
    app.use(express.json())
    app.use('/', (req, res) => {
        res.send("ok");
    });
    return app
}










