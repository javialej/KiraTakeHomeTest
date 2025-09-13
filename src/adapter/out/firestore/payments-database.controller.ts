import {CollectionReference} from '@google-cloud/firestore';
import {firestoreClient} from './client.connection';
import {PaymentsEntity} from '../../../../domain/src/model/payments.entity';
import {IPaymentsRepository} from '../../../../domain/src/interface/payments.repository';
import {UtilsDomainDatabase} from './utils';

export class PaymentsDataBaseRepository implements IPaymentsRepository {
  private readonly collection: CollectionReference;

  constructor(private readonly utilsDomainDatabase: UtilsDomainDatabase) {
    this.collection = firestoreClient.collection(
      this.utilsDomainDatabase.getCollectionName(),
    );
  }
}
