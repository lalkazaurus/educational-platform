import { Body, Controller, HttpException, Post, UseGuards, Get, Req, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '../common/guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { ValidatedPayloadDto } from './dto/validated.dto';
import { RefreshTokenGuard } from '../common/guards/refresh.guard';
import { RegisterPayloadDto } from './dto/register.dto';
import { RolesGuard } from 'src/common/guards/role.quard';
import { Role } from 'src/common/decorsators/role.decorator';
import { Roles } from 'src/users/user/types/roles';

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
    register(@Body() dto: RegisterPayloadDto) {
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

    @Get('add-new-teacher/:id')
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Role(Roles.ADMIN)
    async addNewTeacher(
        @Req() req: Request, 
        @Param('id', ParseIntPipe) id: number, 
    ) {
        return this.authService.addNewTeacher(id)
    }
}
