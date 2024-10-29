import { ILink } from '../interfaces/link';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkDto implements Omit<ILink, 'appId' | 'userId' | 'id'> {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  url: string;
}

export class UpdateLinkDto extends CreateLinkDto {}
