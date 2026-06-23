import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private repo: Repository<Todo>,
  ) {}

  async create(data: any) {
    const todo = this.repo.create(data);
    return await this.repo.save(todo);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const todo = await this.repo.findOne({where:{ id }});
    if(!todo) throw new NotFoundException('Todo #${id} not found'); //404
    return todo;
  }

  async update(id:number, data:any){
    await this.findOne(id);
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id:number) {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
