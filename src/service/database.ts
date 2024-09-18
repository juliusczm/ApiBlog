import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();

export class Database {
    public orm: PrismaClient;
    private static instance: Database;

    private constructor() {
        this.orm = new PrismaClient();

    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

}