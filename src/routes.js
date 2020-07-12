const express = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('./app/middlewares/auth');
const controllers = require('./app/controllers');
const validators = require('./app/validators');

const routes = express.Router();

// Public Routes
routes.post('/user', validate(validators.User), handle(controllers.UserController.store));
routes.post('/session', validate(validators.Session), handle(controllers.SessionController.store));

// Private Routes
routes.use(authMiddleware);

// Users
routes.get('/user/:id', authMiddleware, handle(controllers.UserController.show));
routes.put('/user', authMiddleware, handle(controllers.UserController.update));

// Items
routes.get('/product', handle(controllers.ItemController.index));
routes.get('/product/:id', handle(controllers.ItemController.show));
routes.post('/product', validate(validators.Item), handle(controllers.ItemController.store));
routes.put('/product/:id', validate(validators.Item), handle(controllers.ItemController.update));
routes.delete('/product/:id', handle(controllers.ItemController.destroy));

// Historic Item
routes.post('/historicItem/:id', handle(controllers.HistoricItemController.index));

module.exports = routes;
