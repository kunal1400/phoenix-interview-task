import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Getting user service
  const userService = app.get<UsersService>(UsersService);
  await userService.populateDefaultUser();

  await app.listen(process.env.PORT);
}
bootstrap();
