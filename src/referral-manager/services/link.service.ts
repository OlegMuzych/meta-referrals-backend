import { Injectable } from '@nestjs/common';
import { CreateLinkDto, UpdateLinkDto } from '../dto/link.dto';

@Injectable()
export class LinkService {
  create(linkDto: CreateLinkDto): string {
    console.log(linkDto);
    return 'This action adds a new referralManager';
  }

  findAll() {
    return `This action returns all referralManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} referralManager`;
  }

  update(id: number, linkDto: UpdateLinkDto) {
    console.log(linkDto);
    return `This action updates a #${id} referralManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} referralManager`;
  }
}
