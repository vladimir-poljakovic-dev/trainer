import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { TodosService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Post()
  create(@Body() data:CreateTodoDto) {
    return this.todoService.create(data);
  }
  @Get()
  findAll() {
    return this.todoService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id:number) {
    return this.todoService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id :number, @Body() data:UpdateTodoDto) {
    return this.todoService.update(id, data);
  }
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id:number) {
    return this.todoService.remove(id);
  }
}
