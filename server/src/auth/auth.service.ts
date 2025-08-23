import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserService } from 'src/users/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ValidatedPayloadDto } from './dto/validated.dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService
    ) {}

    async validateUser({ username, password }: AuthPayloadDto) {
       const user =  await this.userService.findByUsername(username)

       if (!user) return null

       const isMatch = await bcrypt.compare(password, user.password);

       if (!isMatch) throw new BadRequestException('Wrong password')
       
       const { password: _, ...result } = user;
       return result;  
    }

    async register({ username, password }: AuthPayloadDto) {
        const user = await this.userService.findByUsername(username)

        if (user) throw new BadRequestException("User already exists")

        const hashedPassword = (await bcrypt.hash(password, 10))
        const newUser = await this.userService.createUser(username, hashedPassword)

        if (!newUser) throw new Error('Failed to create user');

        const tokenData = await this.tokenService.generateTokens(newUser)
        
        return {
            newUser,
            tokenData
        }
    }

    async login(user: ValidatedPayloadDto) {
        const tokenData = await this.tokenService.generateTokens(user)
        
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
}
