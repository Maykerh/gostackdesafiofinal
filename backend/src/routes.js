import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientController from "./app/controllers/RecipientController";
import FileController from "./app/controllers/FileController";
import DeliverymanController from "./app/controllers/DeliverymanController";
import OrderController from "./app/controllers/OrderController";
import DeliveriesController from "./app/controllers/DeliveriesController";

import AuthMiddleware from "./app/middlewares/auth";
import DeliveryProblemsController from "./app/controllers/DeliveryProblemsController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.get("/deliveryman/:deliverymanId", DeliverymanController.index);
routes.get("/deliveryman/:deliverymanId/deliveries", DeliveriesController.index);
routes.put("/deliveryman/:deliverymanId/deliveries/start/:orderId", DeliveriesController.start);
routes.put("/deliveryman/:deliverymanId/deliveries/finish/:orderId", DeliveriesController.finish);

routes.post("/delivery/:id/problems", DeliveryProblemsController.store);
routes.get("/delivery/:id/problems", DeliveryProblemsController.indexByDelivery);

routes.post("/files", upload.single("file"), FileController.store);

/**
 * Rotas com autenticação
 */
routes.use(AuthMiddleware);

routes.put("/users/:id", UserController.update);

routes.get("/recipients", RecipientController.index);
routes.post("/recipients", RecipientController.store);
routes.put("/recipients/:id", RecipientController.update);
routes.delete("/recipients/:id", RecipientController.delete);

routes.get("/deliveryman", DeliverymanController.index);

routes.post("/deliveryman", DeliverymanController.store);
routes.put("/deliveryman/:id", DeliverymanController.update);
routes.delete("/deliveryman/:id", DeliverymanController.delete);

routes.get("/orders/", OrderController.index);
routes.post("/orders", OrderController.store);
routes.put("/orders/:id", OrderController.update);
routes.delete("/orders/:id", OrderController.delete);

routes.get("/delivery/problems", DeliveryProblemsController.index);

routes.put("/problem/:id/cancel-delivery", DeliveryProblemsController.cancelDelivery);

export default routes;
