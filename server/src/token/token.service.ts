import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Token } from './entities/tokens.entity';
import { ValidatedPayloadDto } from 'src/auth/dto/validated.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/user/user.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @Inject('TOKEN_REPOSITORY')
        private tokenRepository: Repository<Token>,
        private readonly userService: UserService
    ) {}

    async generateTokens(user: ValidatedPayloadDto) {
        const payload = { id: user.id, username: user.username, email: user.email, phoneNumber: user.phoneNumber, status: user.status }; 

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '30d',
        });

        await this.saveToken(user, accessToken, refreshToken)

        return {
            accessToken,
            refreshToken,
        };
    }

    validateToken(token: string) {
        try {
            const userData = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_SECRET')
            })
            return userData
        } catch (e: unknown) {
            throw new BadRequestException('Unable to verify access token')
        }
    }

    async saveToken(user: ValidatedPayloadDto, accessToken: string, refreshToken: string) {
        const hashedAccessToken = await bcrypt.hash(accessToken, 10);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        const tokenData = await this.tokenRepository.findOne({ 
            where: {
                user: { id: user.id }
            } 
        });

        if (tokenData) {
            tokenData.refreshTokenHash = hashedRefreshToken;
            tokenData.accessTokenHash = hashedAccessToken;
            tokenData.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            return this.tokenRepository.save(tokenData);
        } else {
            const newToken = this.tokenRepository.create({
                user: { id: user.id }, 
                refreshTokenHash: hashedRefreshToken,
                accessTokenHash: hashedAccessToken,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            });
            return this.tokenRepository.save(newToken);
        }
    }

    async removeToken(userId: number) {
        return this.tokenRepository.delete({
            user: { id: userId }
        });
    }

    async refresh(refreshToken: string) {
        const userData = await this.validateToken(refreshToken);
        const tokenData = await this.findToken(userData.id);

        if (!tokenData) {
            throw new UnauthorizedException("You are not authorized");
        }

        const isValid = await bcrypt.compare(refreshToken, tokenData.refreshTokenHash);
        if (!isValid) {
            throw new UnauthorizedException("The provided refresh token is invalid");
        }

        const user = await this.userService.findById(userData.id);
        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        const { password, ...mainData } = user;

        const tokens = await this.generateTokens(mainData);

        return {
            ...tokens,
            user: mainData,
        };
    }

    async findToken(userId: number): Promise<Token> {
        const token = await this.tokenRepository.findOne({
            where: {
                user: {
                    id: userId
                }}
        })
        
        if (!token) throw new UnauthorizedException('Your session has expired')

        return token
    }

    async compareAccessToken(rawToken: string, hashedToken: string): Promise<boolean> {
        return bcrypt.compare(rawToken, hashedToken);
    }
}
