import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import notebookRouter from './routes.js'

const port = process.env.PORT;
const app = express();
app.use(bodyParser.json())

//routes
app.use('/api/notebooks', notebookRouter)

//db connect
mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('Connected to MongoDB!')
    app.listen(port, () => {
        console.log(`Notebooks server listening on port ${port}`)
    })
    console.log('Connected to DB');
})
.catch(err => {
    console.log('Something went wrong trying to connect to database');
    console.log(err);
}) 


