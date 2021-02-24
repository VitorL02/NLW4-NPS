import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../models/Users';

class UsersController {
    async create(request: Request, response: Response) {

        const { name, email } = request.body;
        const usersRepository = getRepository(Users); // Entity manager (Edição do banco de dados utilizando o conceito de repositorio)

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
        return response.json(users);

    }
}


export { UsersController }