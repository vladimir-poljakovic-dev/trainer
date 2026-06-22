import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ){}

    async register(email:string, password: string){
        const hashed = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({email, password:hashed });
        return this.userRepo.save(user);
    }


    async login(email:string, password:string){
        const user = await this.userRepo.findOne({where:{email}});
        if(!user) throw new UnauthorizedException('Invalid credentials');

        const match = await bcrypt.compare(password, user.password);
        if(!match) throw new UnauthorizedException('Invalid credentials');

        const token = this.jwtService.sign({ sub: user.id, email: user.email });
        return{access_token: token};
    }
}