const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation', // Название вашего API
            version: '1.0.0', // Версия API
            description: 'Документация для Express API с использованием Swagger',
        },
    },
    // Пути к файлам с комментариями
    apis: ['./routes/api/*.ts'], // Укажите путь к файлам с роутами
};

export const swaggerSpec = swaggerJsdoc(options);
