import dotenv from 'dotenv'
dotenv.config();
import express, { json } from 'express'
import cors from 'cors'
import userRoute from './routes/userRoutes';
import clinicRoute from './routes/clinicRoutes';
import doctorRoute from './routes/doctorRoutes';
import appointmentRoute from './routes/appointmentRoutes';
import patientRoute from './routes/patientRoutes';
import serviceRoute from './routes/serviceRoutes';
import agendaRoute from './routes/agendaRoutes';
import blockRoute from './routes/blockRoutes';
import vacationRoute from './routes/vacationRoutes';
import reminderRoute from './routes/reminderRoutes';

const app = express();

app.use(cors())
app.use(json())
app.use("/api/user", userRoute)
app.use("/api/clinic", clinicRoute)
app.use("/api/doctor", doctorRoute)
app.use("/api/appointment", appointmentRoute)
app.use("/api/patient", patientRoute)
app.use("/api/service", serviceRoute)
app.use("/api/agenda", agendaRoute)
app.use("/api/block", blockRoute)
app.use("/api/vacation", vacationRoute)
app.use("/api/reminder", reminderRoute)


export default app;