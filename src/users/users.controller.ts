import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() data2) {
    console.log('new user password: ' + data2.password);

    try {
      const tmp = await this.usersService.create(data2);
      return tmp;
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll() {
    const x = await this.usersService.findAll();
    return x;
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const data2 = await this.usersService.findOne(id);
    return data2;
  }
}
