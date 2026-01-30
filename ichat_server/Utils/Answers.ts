

// Интерфейс, который описывает структуру ответа.
export interface AnswersResponse {
    status: number;
    message?: string;
    data?: any;
}

// Класс-хелпер для создания стандартных ответов.
export class Answers {

    /**
     * Создает успешный ответ.
     * @param code - Код ошибки.
     * @param data - Полезная нагрузка данных.
     * @param msg - Опциональное сообщение.
    */
    public static ok(code: number, data?: any, msg?: string): AnswersResponse {
        return {
            status: code,
            data: data || [],
            ...(msg && { message: msg })
        };
    }

    /**
     * Создает ответ с ошибкой.
     * @param code - Код ошибки.
     * @param msg - Сообщение об ошибке.
    */
    public static error(code: number = 500, msg: string): AnswersResponse {
        return {
            status: code,
            message: msg
        };
    }
}