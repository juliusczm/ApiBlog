import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express'
import { ResponseViewModel } from '../viewModels/responseViewModel.js';

export function handleOrmError(error: unknown, req: Request, res: Response, next: NextFunction) {

    if (error instanceof Prisma.PrismaClientKnownRequestError) {

        let errorViewModel: ResponseViewModel<null>;

        switch (error.code) {
            case 'P2025':
                errorViewModel = ResponseViewModel.error(['Recurso não encontrado.']);
                return res.status(404).json(errorViewModel);
            case 'P2002':
                errorViewModel = ResponseViewModel.error(['Violação de restrição de unicidade.']);
                return res.status(409).json(errorViewModel);
            default:
                errorViewModel = ResponseViewModel.error(['Erro desconhecido no banco de dados.']);
                return res.status(500).json(errorViewModel);
        }
    }

    return next(error);

}
