import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { ResponseViewModel } from "../viewModels/responseViewModel";


export function handleBodyValidate<T>(schema: ZodSchema<T>) {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {

                const responseViewModel = ResponseViewModel.error(err.errors.map(e => e.message));

                return res.status(400).json(responseViewModel);
            }
            next();
        }
    };
}