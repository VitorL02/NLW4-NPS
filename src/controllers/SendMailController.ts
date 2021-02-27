import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { Request, Response } from 'express';
import SendMailService from '../services/SendMailService';


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;
        const userRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const usersAlreadyExists = await userRepository.findOne({ email })

        if (!usersAlreadyExists) {
            return response.status(400).json({
                error: "Usuario não existe"
            });
        }
        const surveysAlreadyExist = await surveysRepository.findOne({ id: survey_id })


        if (!surveysAlreadyExist) {
            return response.status(400).json({
                error: "Survey não existe"
            });
        }
        const surveysUsersAlreadyExist = await surveysUsersRepository.findOne({
            where: { user_id: usersAlreadyExists.id, value: null },
            relations: ["user", "survey"],
        });


        const variables = {
            name: usersAlreadyExists.name,
            title: surveysAlreadyExist.title,
            description: surveysAlreadyExist.description,
            id: "",
            link: process.env.URL_MAIL
        };

        const npsPath = resolve(__dirname, "..", "views", "emails", "NPSMail.hbs");

        if (surveysUsersAlreadyExist) {
            variables.id = surveysUsersAlreadyExist.id;
            await SendMailService.execute(email, surveysAlreadyExist.title, variables, npsPath);
            return response.json(surveysUsersAlreadyExist);

        }


        // Passo 1 :Salvar informações na tabela surveysUsers 
        const surveyUser = surveysUsersRepository.create({
            user_id: usersAlreadyExists.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser);
        //Passo 2 :Enviar o email para o usuario salvo
        variables.id = surveyUser.id;

        await SendMailService.execute(email, surveysAlreadyExist.title, variables, npsPath);

        return response.json(surveyUser);
    }

}
export { SendMailController }