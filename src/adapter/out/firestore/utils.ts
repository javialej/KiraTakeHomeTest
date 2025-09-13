import {ConfigService} from '@nestjs/config';

export class UtilsDomainDatabase {
  constructor(private readonly configService: ConfigService) {}

  getCollectionName(): string {
    return this.configService.get<string>('COLLECTION_NAME');
  }
}
