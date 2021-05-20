import express from 'express';
import routes from './routes/v1';

const app = express();

// parse json request body
app.use(express.json());

app.use('/api/v1', routes);

export default app;