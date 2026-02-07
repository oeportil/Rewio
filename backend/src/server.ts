import express, { json } from 'express'
import cors from 'cors'
import userRoute from './routes/userRoutes';
import clinicRoute from './routes/clinicRoutes';

const app = express();

app.use(cors())
app.use(json())
app.use("/api/user", userRoute)
app.use("/api/clinic", clinicRoute)


export default app;