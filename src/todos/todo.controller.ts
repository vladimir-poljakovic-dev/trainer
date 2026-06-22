import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { TodosService } from './todo.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Post()
  create(@Body() data:any) {
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
  update(@Param('id') id :number, @Body() data:any) {
    return this.todoService.update(id, data);
  }
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id:number) {
    return this.todoService.remove(id);
  }
}
