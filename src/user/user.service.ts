import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from "typeorm"
import {User} from "./user.entity"
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}


    async createUser(email: string, firstname: string, lastname: string, password: string, role: string): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({ email, firstname, lastname, password: hashedPassword, role});
        return this.userRepository.save(user);
    }

    async getUser(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
      }
}
