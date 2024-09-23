import { z } from "zod";

export interface CategoryDTO {
    Id: number;
    Name: string;
    Slug: string;
}

export interface CreateCategoryDTO {
    Name: string;
    Slug: string;
}

export const CreateCategorySchema = z.object({
    Name: z.string({ message: "{Name} is required" }).min(3, { message: "{Name} must be 3 or more characters long" }),
    Slug: z.string({ message: "{Slug} is required" }).min(3, { message: "{Slug} must be 3 or more characters long" })
});

export const PutCategorySchema = z.object({
    Id: z.number(),
    Name: z.string(),
    Slug: z.string()
});

export const PatchCategorySchema = z.object({
    Name: z.string().optional(),
    Slug: z.string().optional()
});