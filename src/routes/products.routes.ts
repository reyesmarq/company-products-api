import {Router} from "express";
import productsCtrl from "../controllers/products.controller";
import {verifyToken, isAdmin, isModerator} from "../middlewares";

const router = Router();

router
  .route("/")
  .get(productsCtrl.getProducts)
  .post([verifyToken, isModerator], productsCtrl.createProduct);

router
  .route("/:productId")
  .get(productsCtrl.getProductbyId)
  .put([verifyToken, isAdmin], productsCtrl.updateProductbyId)
  .delete([verifyToken, isAdmin], productsCtrl.deleteProductbyId);

export {router};
