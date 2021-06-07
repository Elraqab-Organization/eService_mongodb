import express, { json } from "express";
const app = express();
import userRouter from './api/controllers/user_controller';

app.use(json())
app.use('/users', userRouter)

export const api = functions.https.onRequest(app)

export const functionsTimeOut = functions.runWith({
    timeoutSeconds: 300
})