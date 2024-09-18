import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();

export class Database {
    public dbOrm: PrismaClient;

    constructor() {
        this.dbOrm = new PrismaClient();

    }

}