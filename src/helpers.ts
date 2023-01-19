import { createWriteStream } from "fs";
import { get } from "http";

export const updateDocs = () => {
    if (process.env.NODE_ENV === 'development') {

        get(
            `http://localhost:${process.env.PORT}/docs/swagger-ui-bundle.js`, function
            (response) {
            response.pipe(createWriteStream('public/docs/swagger-ui-bundle.js'));
            console.log(
                `Swagger UI bundle file written to: '/public/docs/swagger-ui-bundle.js'`,
            );
        });

        get(`http://localhost:${process.env.PORT}/docs/swagger-ui-init.js`, function (response) {
            response.pipe(createWriteStream('public/docs/swagger-ui-init.js'));
            console.log(
                `Swagger UI init file written to: '/public/docs/swagger-ui-init.js'`,
            );
        });

        get(
            `http://localhost:${process.env.PORT}/docs/swagger-ui-standalone-preset.js`,
            function (response) {
                response.pipe(
                    createWriteStream('public/docs/swagger-ui-standalone-preset.js'),
                );
                console.log(
                    `Swagger UI standalone preset file written to: '/public/docs/swagger-ui-standalone-preset.js'`,
                );
            });

        get(`http://localhost:${process.env.PORT}/docs/swagger-ui.css`, function (response) {
            response.pipe(createWriteStream('public/docs/swagger-ui.css'));
            console.log(
                `Swagger UI css file written to: '/public/docs/swagger-ui.css'`,
            );
        });

    }
}