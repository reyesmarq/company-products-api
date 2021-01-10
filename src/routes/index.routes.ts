import express from "express";
import {router as productRoutes} from "./products.routes";
import {router as authRoutes} from "./auth.routes";
import {router as userRoutes} from "./user.routes"

const router = express();

router
  .use("/products", productRoutes)
  .use("/auth", authRoutes)
  .use("/users", userRoutes);

export default router;
