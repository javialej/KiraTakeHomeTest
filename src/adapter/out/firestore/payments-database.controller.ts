import {CollectionReference} from '@google-cloud/firestore';
import {firestoreClient} from './client.connection';
import {IPaymentsRepository} from '../../../../domain/src/interface/payments.repository';
import {ConfigService} from '@nestjs/config';
import {Injectable} from '@nestjs/common';

@Injectable()
export class PaymentsDataBaseRepository implements IPaymentsRepository {
  private readonly collection: CollectionReference;

  constructor(private readonly configService: ConfigService) {
    const collectionName = this.configService.get<string>('COLLECTION_NAME');
    if (!collectionName) {
      throw new Error('COLLECTION_NAME environment variable not set');
    }
    this.collection = firestoreClient.collection(collectionName);
  }
}