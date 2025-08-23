import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/users/user/user.service";
import { TokenService } from "src/token/token.service";
import { User } from "src/users/user/entities/user.entity";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
        private tokenService: TokenService 
    ) {
        const secret = configService.get<string>('JWT_SECRET')!;
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
            passReqToCallback: true
        });
    }

    async validate(req: any, payload: any) {
        const refreshToken = req.get('authorization')?.replace('Bearer', '').trim()
            || req.cookies?.refreshToken;

        if (!refreshToken) throw new UnauthorizedException('No refresh token provided');

        return {
            ...payload,
            refreshToken, 
        };
    }
}
