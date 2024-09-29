import express from 'express'
import { CategoryController } from '../../controller/category/categoryController.js'
import { CategoryRepository } from '../../repository/CategoryRepository.js';
import { Database } from '../../service/database.js';
import { handleBodyValidate } from '../../handles/handleBodyValidate.js';
import { CreateCategorySchema } from '../../models/categoryModel.js';

// const categoryController = new CategoryController(prisma);
const database = Database.getInstance();
const categoryRepository = new CategoryRepository(database)
const categoryController = new CategoryController(categoryRepository);


const router = express.Router();

router
    .route('/categories')
    .get(categoryController.getAll)
    .post(handleBodyValidate(CreateCategorySchema), categoryController.create);

router
    .route('/categories/posts')
    .get(categoryController.getWithCountPost)

router
    .route('/categories/:id/posts')
    .get(categoryController.getByIdWithCountPost)

router
    .route('/categories/:id')
    .get(categoryController.getById)
    .put(handleBodyValidate(CreateCategorySchema), categoryController.update)
    .delete(categoryController.delete)



export default router;