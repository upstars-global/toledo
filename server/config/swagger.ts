const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Toledo v1.2.2 API spec', // Название вашего API
            version: '1.1.0', // Версия API
            description: 'Документация для Express API с использованием Swagger',
        },
    },
    // Пути к файлам с комментариями
    apis: ['./routes/**/*.ts'], // Укажите путь к файлам с роутами
};

export const swaggerSpec = swaggerJsdoc(options);
