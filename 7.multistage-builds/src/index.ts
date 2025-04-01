import express from 'express';
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello from express')
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${port}`)
})