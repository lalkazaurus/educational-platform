import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { TeacherProfileService } from "../teacher-profile.service";

export class TeacherProfileGuard implements CanActivate {
    constructor(private readonly teacherProfileService: TeacherProfileService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const user = req.user

        const teacher = await this.teacherProfileService.findTeacherByUserId(user.id)

        if (!teacher) throw new BadRequestException("This profile doesn't exist")
        
        return true
    }
}