import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { ResponseFormat } from './infra/common/interceptors/response.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    const config = new DocumentBuilder().setTitle('DEMO API').setDescription('API demo').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [ResponseFormat],
        deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
    app.enableCors({
        credentials: true,
        origin: true,
        allowedHeaders: ['Authorization', 'ResetToken', 'versao', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
        exposedHeaders: ['Authorization', 'ResetToken', 'versao'],
    });
    await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
