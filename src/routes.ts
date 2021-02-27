import { Router } from 'express';
import { UsersController } from './controllers/UsersController';
import { SurveysContoller } from './controllers/SurveysController';
import { SendMailController } from './controllers/SendMailController';
import { AnsewerController } from './controllers/AnsewerController';
import { NpsController } from './controllers/NpsController';
const router = Router();

const usersController = new UsersController();
const surveyController = new SurveysContoller();
const sendMailController = new SendMailController();
const ansewerController = new AnsewerController();
const npsController = new NpsController();

router.post('/users', usersController.create);
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);
router.post('/sendMail', sendMailController.execute);
router.get('/answers/:value', ansewerController.execute);
router.get('/nps/:survey_id', npsController.execute);


export { router };