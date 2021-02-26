import { Router } from 'express';
import { UsersController } from './controllers/UsersController';
import { SurveysContoller } from './controllers/SurveysController';
import { SendMailController } from './controllers/SendMailController';

const router = Router();

const usersController = new UsersController();
const surveyController = new SurveysContoller();
const sendMailController = new SendMailController();

router.post('/users', usersController.create)
router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)
router.post('/sendMail', sendMailController.execute)



export { router };