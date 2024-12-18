import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dataRoutes from './router/data.route.js'
import statusRoutes from './router/status.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.use("/api/data", dataRoutes);
app.use("/api/status",statusRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});