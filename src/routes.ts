import express from 'express';
import { ItemsController } from './controllers/ItemsController';
import { PointsController } from './controllers/PointsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsControler = new ItemsController();

routes.get('/items', itemsControler.get);
routes.get('/points', pointsController.get);
routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.getById);


export default routes;