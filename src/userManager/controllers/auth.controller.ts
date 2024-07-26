import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { LoginEntity } from '../entities/login.entity';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post()
  async login(@Body() loginBody: LoginDTO): Promise<LoginEntity> {
    const { state, message, data } = await this.loginService.login(loginBody);
    if (state) {
      const payload = { sub: data.id };
      const token = await this.jwtService.signAsync(payload);
      return new LoginEntity({ token, user: data });
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
