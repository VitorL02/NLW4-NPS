import { EntityRepository, Repository } from "typeorm";
import { Users } from '../models/Users'

@EntityRepository(Users)
class UsersRepository extends Repository<Users> {

}


export { UsersRepository };