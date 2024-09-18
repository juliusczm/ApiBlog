
//import { createCategory } from '../../models/category/createCategory.js';
import { Request, Response } from 'express';
import { ResponseViewModel } from '../../viewModels/responseViewModel.js';
import { CategoryRepository } from '../../repository/CategoryRepository.js';

export class CategoryController {

    // private _prisma: PrismaClient;
    private _categoryRepository: CategoryRepository

    constructor(categoryRepository: CategoryRepository) {
        this._categoryRepository = categoryRepository;
    }

    getAll = async (req: Request, res: Response) => {
        try {

            // const categories = await this._database.orm.category.findMany();

            const categories = await this._categoryRepository.getAll();

            const successViewModel = ResponseViewModel.success(categories);

            return res.status(200).json(successViewModel);

        } catch (error) {

            const errorViewModel = ResponseViewModel.error(["Erro interno no servidor."]);

            return res.status(500).json(errorViewModel);
        }
    }
}