import { Body, Controller, HttpException, Post, UseGuards, Get, Req, Delete } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ValidatedPayloadDto } from './dto/validated.dto';
import { RefreshTokenGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return this.authService.login(req.user as ValidatedPayloadDto);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        return req.user
    }

    @Post('register')
    register(@Body() dto: AuthPayloadDto) {
        return this.authService.register(dto)
    }

    @Delete('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req: Request) {
        const user = req.user as ValidatedPayloadDto
        await this.authService.logout(user.id)
        return {
            message: `User ${user.username} was succesfully log out`
        }
    }

    @Post('refresh')
    @UseGuards(RefreshTokenGuard)
    async refresh(@Req() req: Request) {
        const user = req.user as ValidatedPayloadDto & { refreshToken: string };
        return this.authService.refresh(user.refreshToken);
    }
}
