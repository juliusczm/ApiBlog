// IUserRepository.ts

export interface IRepository<TCreate, TRead> {
    getAll(): Promise<TRead[]>;
    getById(id: number): Promise<TRead | null>;
    create(data: TCreate): Promise<TRead>;
    update(id: number, data: TCreate): Promise<TRead>;
    delete(id: number): Promise<TRead>;
}