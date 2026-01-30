

import { OpenRouter } from "@openrouter/sdk";


// Сервис для взаимодействия с api с openroute
export class OpenRouterService {
    private client: OpenRouter;

    constructor(apiKey: string) {
        this.client = new OpenRouter({
            apiKey: apiKey,
            defaultHeaders: {
                "HTTP-Referer": "https://infoblock.space", 
                "X-Title": "iChat App",
            }
        });
    }

    /**
     * Создает успешный ответ.
     * @param prompt - Сообщение что надо передать чату.
     * @param models[] - Список моделей(если одна не доступна то пробуеться другая из массива).
     * @returns Вернет сам ответ или ошибку
    */
    public async ask(prompt: string, models: string[]): Promise<string> {
        try {
            const result = this.client.callModel({
                models: models, 
                input: prompt,
            });

            const text = await result.getText();
            
            if (!text) {
                throw new Error("Пустой ответ от моделей");
            }

            return text;

        } catch (error: any) {
            throw new Error(error?.message || "Ошибка при запросе к OpenRouter");
        }
    }
}


