import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TodosModule } from './todos/todo.module';
import {Todo} from './todos/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      autoSave: true,
      location: 'trainer.sqlite', //Got to use trainer.sql
      entities: [User, Todo],
      synchronize: true,
    }),
    UsersModule,
    TodosModule,
  ],
})
export class AppModule {}
