import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieparser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieparser());
  await app.listen(3030, () => {
    console.log("server is running on port 3030");
  });
}
bootstrap();
