import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserService } from 'src/users/user/user.service';
import * as bcrypt from 'bcrypt';
import { FullUserPayload, ValidatedPayloadDto } from './dto/validated.dto';
import { TokenService } from 'src/token/token.service';
import { RegisterPayloadDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    async validateUser({ email, password }: AuthPayloadDto) {
       const user =  await this.userService.findByEmail(email)

       if (!user) throw new BadRequestException("User doesn't extist")

       const isMatch = await bcrypt.compare(password, user.password);

       if (!isMatch) throw new BadRequestException('Wrong password')
       
       const { password: _, ...result } = user;
       return result;  
    }

    async register({ username, email, password, phoneNumber }: RegisterPayloadDto) {
        const user = await this.userService.findUniqueUser(email, username, phoneNumber)
        if (user) throw new BadRequestException("User already exists")

        const hashedPassword = (await bcrypt.hash(password, 10))
        const newUser = await this.userService.createUser(username, email, hashedPassword, phoneNumber)

        if (!newUser) throw new Error('Failed to create user');

        const tokenData = await this.tokenService.generateTokens(newUser)

        const { password: _, ...saveUser } = newUser
        
        return {
            saveUser,
            tokenData
        }
    }

    async login(user: FullUserPayload) {
        const tokenData = await this.tokenService.generateTokens(user)

        const lastLogin = await this.userService.setLoginEntry(user.id)

        user.lastLogin = lastLogin;
        
        return {
            user,
            tokenData
        }
    }

    async logout( userId: number ) {
        this.tokenService.removeToken(userId)
    }

    async refresh(refreshToken: string) {
        const tokens = await this.tokenService.refresh(refreshToken)
        return tokens
    }

    async addNewTeacher(id: number) {
        return this.userService.addTeacherRole(id)
    }
}
