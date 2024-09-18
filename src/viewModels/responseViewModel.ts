export class ResponseViewModel<T> {
    data: T | null;
    error: string[] | null;

    // Construtor privado para forçar o uso dos métodos estáticos
    private constructor(data: T | null, error: string[] | null) {
        this.data = data;
        this.error = error;
    }

    static success<T>(data: T): ResponseViewModel<T> {
        return new ResponseViewModel(data, null);
    }

    static error(error: string[]): ResponseViewModel<null> {
        return new ResponseViewModel(null, error);
    }
}