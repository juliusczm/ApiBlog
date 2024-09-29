import { CategoryDTO, CategoryWithPost, EditorCategoryDTO } from "../models/categoryModel";
import { Database } from "../service/database";
import { IRepository } from "./IRepository";


export class CategoryRepository implements IRepository<EditorCategoryDTO, CategoryDTO> {

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

    create(input: EditorCategoryDTO): Promise<CategoryDTO> {

        const category: Promise<CategoryDTO> = this._database.orm.category.create({
            data: input
        });

        return category;


    }

    update(id: number, data: EditorCategoryDTO): Promise<CategoryDTO> {

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

    getWithCountPost(): Promise<CategoryWithPost[]> {
        const categoryWithCountPosts: Promise<CategoryWithPost[]> = this._database.orm.category.findMany({
            include: {
                Post: true,
            },
        });

        return categoryWithCountPosts;
    }


    getByIdWithCountPost(id: number): Promise<CategoryWithPost | null> {
        const categoryWithCountPosts = this._database.orm.category.findUnique({
            where: {
                Id: id,
            },
            include: {
                Post: true,
            },
        });

        return categoryWithCountPosts;
    }
}