import express, { json } from 'express'
import cors from 'cors'
import userRoute from './routes/userRoutes';
import clinicRoute from './routes/clinicRoutes';
import doctorRoute from './routes/doctorRoutes';

const app = express();

app.use(cors())
app.use(json())
app.use("/api/user", userRoute)
app.use("/api/clinic", clinicRoute)
app.use("/api/doctor", doctorRoute)


export default app;