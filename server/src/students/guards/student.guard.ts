import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { StudentsService } from "../students.service";

@Injectable()
export class StudentsGuard implements CanActivate {
    constructor (private readonly studentsService: StudentsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const user = req.user

        const studentsProfile = await this.studentsService.findStudentsProfileByUserId(user.id)

        if (!studentsProfile) throw new BadRequestException("This profile doesn't exist")
        
        req.student = studentsProfile
        return true
    }
}