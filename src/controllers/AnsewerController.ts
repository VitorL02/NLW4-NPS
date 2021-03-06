import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnsewerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;


        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });
        if (!surveyUser) {
            return response.status(400).json({
                error: "Survey user  não existe "
            })
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);
        return response.json(surveyUser);

    }
}

export { AnsewerController }