import { Router } from 'express';
import { UsersController } from './controllers/UsersController';
import { SurveysContoller } from './controllers/SurveysController';

const router = Router();

const usersController = new UsersController();
const surveyController = new SurveysContoller();

router.post('/users', usersController.create)
router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)



export { router };