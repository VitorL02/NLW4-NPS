import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

import * as yup from 'yup';

class UsersController {
    async create(request: Request, response: Response) {

        const { name, email } = request.body;

        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        if (!(await schema.isValid(request.body, { abortEarly: false }))) {
            return response.status(400).json({ error: 'Validação falhou ' })
        }


        const usersRepository = getCustomRepository(UsersRepository); // Entity manager (Edição do banco de dados utilizando o conceito de repositorio)

        const usersAlreadyExists = await usersRepository.findOne({
            email
        });
        if (usersAlreadyExists) {
            return response.status(400).json({
                error: "Usuario ja existe"
            });
        }//Procura se existe um usuario ja com email(validação)


        const users = usersRepository.create({
            name,
            email,
        }
        );
        await usersRepository.save(users);
        return response.status(201).json(users);

    }
}


export { UsersController }