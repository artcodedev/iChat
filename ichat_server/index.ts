import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Console } from './Utils/Console';
import { Logger } from './Utils/Logger';
import { Answers } from './Utils/Answers';
import { OpenRouterService } from './Service/OpenRouterService';

const PORT: number = 3001;
const PRIVATE_KEY: string | undefined = process.env.OPENROUTER_API_KEY;
const MODELS_ID: string | undefined  = process.env.MODELS_ID;

Console.warning(MODELS_ID)

// Класс для записи логов
const logger = new Logger('./Logger/logs.txt');

// Валидация критических переменных
const requiredConfigs = [
    { value: PRIVATE_KEY, name: 'OPENROUTER_API_KEY' },
    { value: MODELS_ID, name: 'MODELS_ID' }
];

const missingConfigs = requiredConfigs.filter(cfg => !cfg.value);

if (missingConfigs.length > 0) {
    const critic_error = '❌ КРИТИЧЕСКАЯ ОШИБКА КОНФИГУРАЦИИ';
    
    Console.error(critic_error);
    logger.log(critic_error);

    missingConfigs.forEach(cfg => {
        const error = `Переменная ${cfg.name} не задана.`;
        Console.warning(error);
        logger.log(error);
    });

    Console.error("\nПожалуйста, создайте файл .env или передайте переменные окружения.");
    process.exit(1);
}

const MODELS_ARRAY = MODELS_ID!.split(',').map(m => m.trim());

const ai = new OpenRouterService(PRIVATE_KEY!);

const message_start: string = `🦊 Server is running at http://localhost:${PORT}`;
const message_docs: string = `📑 Docs are available at http://localhost:${PORT}/docs`;

export const app = new Elysia();

// COSR запросы разрешены
app.use(cors())

// Документация
app.use(swagger({
    path: '/docs',
    documentation: {
        info: {
            title: 'AI Free Proxy API',
            version: '1.0.0',
            description: 'Сервис для работы с бесплатными моделями через OpenRouter'
        },
        tags: [
            { name: 'AI', description: 'Эндпоинты для взаимодействия с нейросетями' }
        ]
    }
}))

// Переопределение ошибок под один стандарт Answer
app.onError(async ({ code, error, set }) => {

    let statusCode = 500;
    if (code === 'VALIDATION') statusCode = 400;
    if (code === 'NOT_FOUND') statusCode = 404;

    const errorMessage = (error as any)?.message || error?.toString() || 'Unknown Error';

    const logMsg = `${code} | ${errorMessage}`;

    await logger.log(logMsg);
    Console.error(logMsg);

    const response = Answers.error(statusCode, errorMessage);
    set.status = response.status;

    return response;
})

// Начальный эндпоинт
app.get('/api/', ({ set }) => {
    const response = Answers.ok(200, { ichat: true });
    set.status = response.status;
    return response;
})

// Запросы с клиента попадают сюда от фронта(можно добавить телеграмм бота или мини приложение) 
app.post('/api/chat', async ({ body, set }) => {

    try {
        const result = await ai.ask(body.prompt, MODELS_ARRAY!);

        const response = Answers.ok(200, { answer: result });
        set.status = response.status;
        return response;

    } catch (e: any) {

        const err = Answers.error(500, e.message);
        set.status = err.status;
        return err;
    }
}, {
    body: t.Object({
        prompt: t.String({ minLength: 1 })
    }),
    detail: {
        summary: 'Запрос к ИИ',
        tags: ['AI']
    }
});

Console.log(message_start);
Console.log(message_docs);
app.listen(PORT);

