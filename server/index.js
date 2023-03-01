import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./database/connect.js";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* SERVER & DATABASE SETUP */
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

const startServer = async () => {
    try {
        connectDB(MONGO_URL);
        app.listen(PORT, () => console.log(`Server Running on PORT - ${PORT}`));
    } catch (error) {
        console.log(`Server Not Running.Solve the Error: ${error}`);
    }
};

startServer()