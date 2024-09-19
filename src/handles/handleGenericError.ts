import { Request, Response, NextFunction } from "express";
import { ResponseViewModel } from "../viewModels/responseViewModel.js";

export function handleGenericError(error: unknown, req: Request, res: Response, next: NextFunction) {

    const generalError = ResponseViewModel.error(['Erro interno do servidor.']);
    return res.status(500).json(generalError);
}