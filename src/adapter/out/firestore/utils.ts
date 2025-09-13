import {ConfigService} from '@nestjs/config';

export class UtilsDomainDatabase {
  constructor(private readonly configService: ConfigService) {}

  getCollectionName(): string {
    const collectionName = this.configService.get<string>('COLLECTION_NAME');
    if (!collectionName) {
      throw new Error('COLLECTION_NAME environment variable not set');
    }
    return collectionName;
  }
}
