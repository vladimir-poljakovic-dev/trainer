import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(data2: any) {
    const tmp = this.repo.create({
      email: data2.email,
      password: data2.password,
    });
    return await this.repo.save(tmp);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: any) {
    return this.repo.findOne({ where: { id: id } });
  }
}
