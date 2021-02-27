export class AppError {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number) {
        this.message,
            this.statusCode
    }
}
//Possivel trocar isso pelo response.status.error