
import express from 'express';

const healthRouter = express.Router();

healthRouter.get('/', (req, res) => {
    res.status(200).send('Up!!!!');
});

export default healthRouter;