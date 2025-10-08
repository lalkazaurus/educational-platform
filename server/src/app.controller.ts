import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("/")
export class AppController {
    constructor (private readonly appService: AppService) {}

    @Get("/levels")
    async getLevels() {
        return this.appService.getLevels()
    }

    @Get("/categories")
    async getCategories() {
        return this.appService.getCategories()
    }
}