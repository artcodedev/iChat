import { appendFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

// Класс логов, создает файл если нет
export class Logger {
    private file_name: string;

    constructor(file: string) {
        this.file_name = file;
    }

    /**
     * Сохраняет лог в файл
     * @param message - Сообщение ошибки.
    */
    public async log(message: string): Promise<void> {
        const time = new Date().toLocaleString(); 
        const logEntry = `[+] ${time} ${message}\n`;

        try {
            const dir = dirname(this.file_name);
            
            await mkdir(dir, { recursive: true });

            await appendFile(this.file_name, logEntry);
        } catch (e: unknown) {
            console.error("Критическая ошибка логгера:", e);
        }
    }
}