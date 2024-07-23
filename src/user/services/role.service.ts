import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  createResponse,
  IResponseFromService,
} from '../interfaces/errors.type';
import { RoleEntity } from '../entities/role.entity';
import { RoleCreateDTO, RoleDeleteDTO, RoleUpdateDTO } from '../dto/role.dto';
import { IRole } from '../interfaces/role.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(): Promise<IResponseFromService<RoleEntity[]>> {
    const data = await this.roleRepository.find();
    return createResponse<RoleEntity[]>({ data });
  }
  async create(role: RoleCreateDTO): Promise<IResponseFromService<RoleEntity>> {
    const newRole = await this.roleRepository.create(role);
    const data = await this.roleRepository.save(newRole);
    return createResponse<RoleEntity>({ data });
  }

  async update(
    id: IRole['id'],
    role: Partial<RoleEntity>,
  ): Promise<IResponseFromService> {
    const exist = await this.roleRepository.existsBy({ id });
    if (!exist) {
      return createResponse<null>({ state: false, message: 'Role not exist' });
    }
    await this.roleRepository.update({ id }, role);
    return createResponse();
  }

  async delete(id: IRole['id']): Promise<IResponseFromService<RoleEntity>> {
    const exist = await this.roleRepository.existsBy({ id });
    if (exist) {
      await this.roleRepository.delete({ id });
    } else {
      return createResponse<null>({ state: false, message: 'Role not exist' });
    }
    return createResponse();
  }
}
