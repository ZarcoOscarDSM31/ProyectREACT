import Express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js';


const app = Express();

app.use(morgan('dev'));
app.use(Express.json());

app.use("/api", authRoutes);

export default app;