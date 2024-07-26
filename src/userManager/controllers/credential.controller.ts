import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';

import {
  CredentialCreateDTO,
  CredentialDeleteDTO,
  CredentialUpdateDTO,
} from '../dto/credential.dto';
import { CredentialsService } from '../services/credential.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('credential')
@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialsService) {}

  @Post()
  async create(@Body() credential: CredentialCreateDTO): Promise<boolean> {
    const { state, message } = await this.credentialService.create(credential);
    if (state) {
      return state;
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() credential: CredentialUpdateDTO): Promise<boolean> {
    const { state, message } = await this.credentialService.update(credential);
    if (state) {
      return state;
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async delete(@Body() credential: CredentialDeleteDTO): Promise<boolean> {
    const { state, message } = await this.credentialService.delete(credential);
    if (state) {
      return state;
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
