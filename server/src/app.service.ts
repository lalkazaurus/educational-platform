import { Injectable } from "@nestjs/common";
import { Categories } from "./subject/types/categories";
import { Levels } from "./subject/types/levels";

@Injectable()
export class AppService {
    constructor() {}

    async getLevels() {
        return Object.keys(Levels)
    }

    async getCategories() {
        return Object.keys(Categories)
    }
}