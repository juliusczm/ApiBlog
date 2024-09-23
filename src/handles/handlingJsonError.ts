import { Request, Response, NextFunction } from "express";
import { ResponseViewModel } from "../viewModels/responseViewModel.js";

interface SyntaxErrorGeneric extends SyntaxError {
    status?: number;
    body?: any;
}


export const handlingJsonError = (err: unknown, req: Request, res: Response, next: NextFunction) => {

    if (['POST', 'PATCH', 'PUT'].includes(req.method)) {

        const typedError = err as SyntaxErrorGeneric;

        if (typedError instanceof SyntaxError && typedError.status === 400 && 'body' in typedError) {

            const errorViewModel = ResponseViewModel.error(['Formato Json inválido.']);

            return res.status(400).json(errorViewModel);

        }
    }

    return next();
}