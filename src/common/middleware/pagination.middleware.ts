import {Injectable, NestMiddleware, UnprocessableEntityException} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";

declare module 'express' {
    interface Request {
        pagination?: {
            page: number;
            limit: number;
        }
    }
}

export interface IPagination {
    page: number;
    limit: number;
}

export interface IPaginatedData<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
    }
}

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        if (Number.isNaN(page) || page < 1
          || Number.isNaN(limit) || limit < 1 || limit > 1000) {
            throw new UnprocessableEntityException('Invalid pagination parameters')
        }

        req.pagination = { page, limit };
        next();
    }
}
