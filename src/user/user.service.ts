import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  update(id: IUser['id'], user: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update({ id }, user);
  }

  delete(id: IUser['id']): Promise<UpdateResult> {
    return this.usersRepository.update({ id }, { deleteDate: Date.now() });
  }
}
