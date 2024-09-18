import express from 'express'
import { CategoryController } from '../../controller/category/categoryController.js'
import { CategoryRepository } from '../../repository/CategoryRepository.js';
import { Database } from '../../service/database.js';

// const categoryController = new CategoryController(prisma);
const database = Database.getInstance();
const categoryRepository = new CategoryRepository(database)
const categoryController = new CategoryController(categoryRepository);


const router = express.Router();

router
    .route('/categories')
    .get(categoryController.getAll);

// router
//     .route('/categories/:id')
//     .get(categoryController.getById)
//     .put(categoryController.update)
//     .delete(categoryController.delete)


export default router;