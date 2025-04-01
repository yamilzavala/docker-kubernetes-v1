import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import healthRouter from './routes/health.js';
import keyValueRouter from './routes/store.js';


const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.json({messaje: 'Welcome marcos to key-value app'})
})
app.use('/health', healthRouter);
app.use('/store', keyValueRouter)


console.log('Connecting to DB');
mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST}/${process.env.KEY_VALUE_DB}`, {
        auth: {
            username: process.env.KEY_VALUE_USER,
            password: process.env.KEY_VALUE_PASSWORD
        },
        connectTimeoutMS: 500
    }
    // `mongodb://key-value-user:key-value-password@mongodb:27017/mongodb?authSource=key-value-db`,
)
  .then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
    console.log('Connected to DB');
  })
  .catch((error) => {
      console.log('Something went wrong trying to connect to database');
      console.log(error);
  });

  