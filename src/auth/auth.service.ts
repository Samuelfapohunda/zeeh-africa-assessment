import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}


    async validateUser (email: string, password: string): Promise<any> {
        const user = await this.userService.getUser(email);
        if (user && bcrypt.compare(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.id, role: user.role};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
