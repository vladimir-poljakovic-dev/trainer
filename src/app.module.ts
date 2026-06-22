import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TodosModule } from './todos/todo.module';
import {Todo} from './todos/todo.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      autoSave: true,
      location: 'trainer.sqlite', 
      entities: [User, Todo],
      synchronize: true,
    }),
    UsersModule,
    TodosModule,
    AuthModule,
  ],
})
export class AppModule {}
