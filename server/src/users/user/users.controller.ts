import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/common/guards/jwt.guard";
import { RolesGuard } from "src/common/guards/role.quard";
import { Role } from "src/common/decorsators/role.decorator";
import { Roles } from "./types/roles";

@Controller("users")
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get("")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role(Roles.ADMIN) 
    async findAll() {
        return await this.userService.findAll()
    }
}