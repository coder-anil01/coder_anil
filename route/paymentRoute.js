import express from "express";
import { createPaymentAvanshikaSeccion, createPaymentSeccion, verifyPayment, verifyPaymentAnil } from "../controller/paymentController.js";
const route = express.Router();

route.post('/session', createPaymentSeccion);
route.post('/verifying', verifyPaymentAnil);

route.post('/avanshika/session', createPaymentAvanshikaSeccion);
route.post('/avanshika/verifying', verifyPayment);

export default route;