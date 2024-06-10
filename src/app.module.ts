import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, RequestService, {
    provide: 'APP_GUARD', useClass: AuthGuard
  },
  {
    provide: 'APP_INTERCEPTOR', useClass: LoggingInterceptor, scope: Scope.REQUEST
  },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
