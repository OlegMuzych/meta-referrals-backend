import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateLinkDto } from '../dto/link.dto';
import { LinkService } from '../services/link.service';

@ApiTags('link')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async addLink(@Body() link: CreateLinkDto): Promise<string> {
    const data = this.linkService.create(link);
    // if (state) {
    //   return new UserEntity(data);
    // } else {
    //   throw new HttpException(message, HttpStatus.BAD_REQUEST);
    // }
    return data;
  }

  // @Get()
  // async getUsers(): Promise<UserEntity[]> {
  //   const { state, message, data } = await this.userService.findAll();
  //   if (state) {
  //     return data.map((item) => new UserEntity(item));
  //   } else {
  //     throw new HttpException(message, HttpStatus.BAD_REQUEST);
  //   }
  // }
  //
  // @Put(':id')
  // async updateUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() user: UserUpdateDTO,
  // ): Promise<boolean> {
  //   const { state, message } = await this.userService.update(Number(id), user);
  //   if (state) {
  //     return state;
  //   } else {
  //     throw new HttpException(message, HttpStatus.BAD_REQUEST);
  //   }
  // }
  //
  // @Delete(':id')
  // async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
  //   const { state, message } = await this.userService.delete(id);
  //   if (state) {
  //     return state;
  //   } else {
  //     throw new HttpException(message, HttpStatus.BAD_REQUEST);
  //   }
  // }
  // @Post('addrules')
  // async addRules(@Body() body: UserAddRulesDTO): Promise<boolean> {
  //   const { state, message } = await this.userService.addRules(body);
  //   if (state) {
  //     return state;
  //   } else {
  //     throw new HttpException(message, HttpStatus.BAD_REQUEST);
  //   }
  // }
  // @Post('addroles')
  // async addRoles(@Body() body: UserAddRolesDTO): Promise<boolean> {
  //   const { state, message } = await this.userService.addRoles(body);
  //   if (state) {
  //     return state;
  //   } else {
  //     throw new HttpException(message, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
