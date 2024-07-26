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
import { AuthEntity } from '../entities/auth.entity';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post()
  async signIn(@Body() loginBody: LoginDTO): Promise<AuthEntity> {
    const { state, message, data } = await this.authService.signIn(loginBody);
    if (state) {
      const payload = { sub: data.id };
      const token = await this.jwtService.signAsync(payload);
      return new AuthEntity({ token, user: data });
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
