//import { createCategory } from '../../models/category/createCategory.js';
import { NextFunction, Request, Response } from 'express';
import { ResponseViewModel } from '../../viewModels/responseViewModel.js';
import { CategoryRepository } from '../../repository/CategoryRepository.js';
import { CategoryDTO, CreateCategoryDTO } from '../../models/categoryModel.js';

type CategoryResponse = CategoryDTO[] | CategoryDTO | null;

export class CategoryController {

    // private _prisma: PrismaClient;
    private _categoryRepository: CategoryRepository

    constructor(categoryRepository: CategoryRepository) {
        this._categoryRepository = categoryRepository;
    }

    getAll = async (req: Request, res: Response<ResponseViewModel<CategoryResponse>>, next: NextFunction) => {
        try {

            const categories = await this._categoryRepository.getAll();

            const successViewModel = ResponseViewModel.success(categories);

            return res.status(200).json(successViewModel);

        } catch (error) {
            next(error);
            return;
        }
    }

    getById = async (req: Request, res: Response<ResponseViewModel<CategoryResponse>>, next: NextFunction) => {
        try {

            const id: number = parseInt(req.params.id);

            if (isNaN(id))
                return res.status(400).json(ResponseViewModel.error(["O id da categoria deve ser um número válido"]));

            const category = await this._categoryRepository.getById(id);

            if (category == null)
                return res.status(200).json(ResponseViewModel.error(["Categoria não encontrada"]));

            const successViewModel = ResponseViewModel.success(category);

            return res.status(200).json(successViewModel);

        } catch (error) {
            return next(error);
        }
    }

    create = async (req: Request<{}, {}, CreateCategoryDTO>, res: Response<ResponseViewModel<CategoryResponse>>, next: NextFunction) => {
        try {

            const { body } = req;

            const category = await this._categoryRepository.create(body);

            const successViewModel = ResponseViewModel.success(category);

            return res.status(200).json(successViewModel);

        } catch (error) {
            return next(error);
        }
    }

    delete = async (req: Request<{ id: string }, {}, CategoryDTO>, res: Response<ResponseViewModel<CategoryResponse>>, next: NextFunction) => {
        try {

            const id: number = parseInt(req.params.id);

            if (isNaN(id))
                return res.status(400).json(ResponseViewModel.error(["O id da categoria deve ser um número válido"]));

            const category = await this._categoryRepository.delete(id);

            if (category == null)
                return res.status(200).json(ResponseViewModel.error(["Categoria não encontrada"]));

            const successViewModel = ResponseViewModel.success(category);

            return res.status(200).json(successViewModel);

        } catch (error) {
            return next(error);
        }
    }

    update = async (req: Request<{ id: string }, {}, CreateCategoryDTO>, res: Response<ResponseViewModel<CategoryResponse>>, next: NextFunction) => {
        try {

            const id: number = parseInt(req.params.id);

            if (isNaN(id))
                return res.status(400).json(ResponseViewModel.error(["O id da categoria deve ser um número válido"]));

            const { Name, Slug } = req.body;

            const categoryEdited: CreateCategoryDTO = {
                Name: Name,
                Slug: Slug
            }

            const category = await this._categoryRepository.update(id, categoryEdited);

            if (category == null)
                return res.status(200).json(ResponseViewModel.error(["Categoria não encontrada"]));

            const successViewModel = ResponseViewModel.success(category);

            return res.status(200).json(successViewModel);

        } catch (error) {
            return next(error);
        }
    }

}

