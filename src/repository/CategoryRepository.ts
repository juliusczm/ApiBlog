import { CategoryDTO, CreateCategoryDTO } from "../models/categoryModel";
import { Database } from "../service/database";
import { IRepository } from "./IRepository";


export class CategoryRepository implements IRepository<CreateCategoryDTO, CategoryDTO> {

    private _database: Database;

    constructor(database: Database) {
        this._database = database;
    }

    getAll(): Promise<CategoryDTO[]> {
        return this._database.orm.category.findMany();
    }

    getById(id: number): Promise<CategoryDTO | null> {
        return this._database.orm.category.findUnique({
            where: {
                Id: id,
            },
        });

    }

    create(input: CreateCategoryDTO): Promise<CategoryDTO> {

        const category: Promise<CategoryDTO> = this._database.orm.category.create({
            data: input
        });

        return category;


    }

    update(id: number, data: CreateCategoryDTO): Promise<CategoryDTO> {

        const category: Promise<CategoryDTO> = this._database.orm.category.update({
            where: {
                Id: id,
            },

            data: data,

        });

        return category;
    }

    delete(id: number): Promise<CategoryDTO> {

        const category: Promise<CategoryDTO> = this._database.orm.category.delete({
            where: {
                Id: id,
            },
        });

        return category;
    }

}