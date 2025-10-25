import { eventEmitter } from "../eventEmitter/eventEmitter.js";
import { handleCreateOrder } from "../handlers/orderHandlers.js";

// Orders
eventEmitter.on("create-order", handleCreateOrder);
