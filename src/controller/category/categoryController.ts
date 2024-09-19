
//import { createCategory } from '../../models/category/createCategory.js';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ResponseViewModel } from '../../viewModels/responseViewModel.js';
import { CategoryRepository } from '../../repository/CategoryRepository.js';
import { handleOrmError } from '../../handles/handleOrmError.js';

export class CategoryController {

    // private _prisma: PrismaClient;
    private _categoryRepository: CategoryRepository

    constructor(categoryRepository: CategoryRepository) {
        this._categoryRepository = categoryRepository;
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const categories = await this._categoryRepository.getAll();

            const successViewModel = ResponseViewModel.success(categories);

            return res.status(200).json(successViewModel);

        } catch (error) {
            next(error);
            return;
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const id: number = parseInt(req.params.id);

            const category = await this._categoryRepository.getById(id);

            const successViewModel = ResponseViewModel.success(category);

            return res.status(200).json(successViewModel);

        } catch (error) {
            next(error);
            return;
        }
    }
}

