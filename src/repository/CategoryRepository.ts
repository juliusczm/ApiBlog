import { Database } from "../service/database";
import { IRepository } from "./IRepository";
import type { Category } from "@prisma/client";

export class CategoryRepository implements IRepository<Category> {

    private _database: Database;

    constructor(database: Database) {
        this._database = database;
    }

    getAll(): Promise<Category[]> {
        return this._database.orm.category.findMany();
    }

}