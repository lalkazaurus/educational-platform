import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenService } from "src/token/token.service";
import { User } from "src/users/user/entities/user.entity";
import { UserService } from "src/users/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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

    async validate(req: Request, payload: User) {
        const user = await this.userService.findByEmail(payload.email);
        
        if (!user) throw new BadRequestException("User doesn't exist");
        
        const { password, ...userInfo } = user;
        
        return userInfo;
    }
}