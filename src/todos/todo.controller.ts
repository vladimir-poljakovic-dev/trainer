import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { TodosService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) //Status 201
  create(@Body() data:CreateTodoDto) {
    return this.todoService.create(data);
  }
  @Get()
  findAll() {
    return this.todoService.findAll();
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK) //Status 200
  findOne(@Param('id') id:number) {
    return this.todoService.findOne(id);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.OK) //Status 200
  update(@Param('id') id :number, @Body() data:UpdateTodoDto) {
    return this.todoService.update(id, data);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) //Status 204
  remove(@Param('id') id:number) {
    return this.todoService.remove(id);
  }
}
