

// Цветной вывод по разный тип сообщение
export class Console {

    private static readonly colors = {
        reset: "\x1b[0m",
        cyan: "\x1b[36m",
        red: "\x1b[31m",
        yellow: "\x1b[33m",
        green: "\x1b[32m",
    };

    /**
     * Простой лог
     * @param arts[] - Сообщения.
    */
    static log(...args: any[]) {
        console.log(this.colors.cyan, ...args, this.colors.reset);
    }

    /**
     * Лог ошибки
     * @param arts[] - Сообщения.
    */
    static error(...args: any[]) {
        console.error(this.colors.red, ...args, this.colors.reset);
    }

    /**
     * Лог Предупреждения
     * @param arts[] - Сообщения.
    */
    static warning(...args: any[]) {
        console.warn(this.colors.yellow, ...args, this.colors.reset);
    }

    /**
     * Лог успеха
     * @param arts[] - Сообщения.
    */
    static ok(...args: any[]) {
        console.log(this.colors.green, ...args, this.colors.reset);
    }
    
}