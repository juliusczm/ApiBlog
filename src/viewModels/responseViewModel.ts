export class ResponseViewModel<T> {
    data: T | [];
    error: string[];

    // Construtor privado para forçar o uso dos métodos estáticos
    private constructor(data: T | [], error: string[]) {
        this.data = data;
        this.error = error;
    }

    static success<T>(data: T): ResponseViewModel<T> {
        return new ResponseViewModel(data, []);
    }

    static error(error: string[]): ResponseViewModel<[]> {
        return new ResponseViewModel([], error);
    }
}