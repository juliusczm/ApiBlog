// IUserRepository.ts

export interface IRepository<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T>;
    // create(data: T): Promise<T>;
    // update(id: string, data: T): Promise<T | null>;
    // delete(id: string): Promise<boolean>;
}