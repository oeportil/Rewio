import express, { json } from 'express'
import cors from 'cors'
import userRoute from './routes/userRoutes';

const app = express();

app.use(cors())
app.use(json())
app.use("/api/user", userRoute)


export default app;