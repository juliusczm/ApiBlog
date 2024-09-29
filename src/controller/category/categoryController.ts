//import { createCategory } from '../../models/category/createCategory.js';
import { NextFunction, Request, Response } from 'express';
import { ResponseViewModel } from '../../viewModels/responseViewModel.js';
import { CategoryRepository } from '../../repository/CategoryRepository.js';
import { CategoryDTO, CategoryWithTotalPosts, EditorCategoryDTO } from '../../models/categoryModel.js';

type CategoryResponse = CategoryDTO[] | CategoryDTO | null;

type CategoryWithPostsResponse = CategoryWithTotalPosts[] | CategoryWithTotalPosts | null;


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

    create = async (req: Request<{}, {}, EditorCategoryDTO>, res: Response<ResponseViewModel<CategoryResponse>>, next: NextFunction) => {
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

    update = async (req: Request<{ id: string }, {}, EditorCategoryDTO>, res: Response<ResponseViewModel<CategoryResponse>>, next: NextFunction) => {
        try {

            const id: number = parseInt(req.params.id);

            if (isNaN(id))
                return res.status(400).json(ResponseViewModel.error(["O id da categoria deve ser um número válido"]));

            const { Name, Slug } = req.body;

            const categoryEdited: EditorCategoryDTO = {
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

    getWithCountPost = async (req: Request, res: Response<ResponseViewModel<CategoryWithPostsResponse>>, next: NextFunction) => {

        try {

            const categoryWithCountPost = await this._categoryRepository.getWithCountPost();

            if (categoryWithCountPost == null)
                return res.status(200).json(ResponseViewModel.error(["Categoria não encontrada"]));

            const viewModel: CategoryWithTotalPosts[] = categoryWithCountPost.map(item => ({
                Id: item.Id,
                Name: item.Name,
                Slug: item.Slug,
                Posts: item.Post?.length || 0
            }));


            const successViewModel = ResponseViewModel.success(viewModel);

            return res.status(200).json(successViewModel);


        } catch (error) {
            return next(error);
        }

    }

    getByIdWithCountPost = async (req: Request, res: Response<ResponseViewModel<CategoryWithPostsResponse>>, next: NextFunction) => {

        try {

            const id: number = parseInt(req.params.id);

            if (isNaN(id))
                return res.status(400).json(ResponseViewModel.error(["O id da categoria deve ser um número válido"]));

            const categoryWithCountPost = await this._categoryRepository.getByIdWithCountPost(id);

            if (categoryWithCountPost == null)
                return res.status(200).json(ResponseViewModel.error(["Categoria não encontrada"]));

            const viewModel: CategoryWithTotalPosts = {
                Id: categoryWithCountPost.Id,
                Name: categoryWithCountPost.Name,
                Slug: categoryWithCountPost.Slug,
                Posts: categoryWithCountPost.Post?.length || 0
            };

            const successViewModel = ResponseViewModel.success(viewModel);

            return res.status(200).json(successViewModel);


        } catch (error) {
            return next(error);
        }

    }

}

