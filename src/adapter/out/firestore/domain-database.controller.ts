import {CollectionReference, DocumentData} from '@google-cloud/firestore';
import {firestoreClient} from './client.connection';
import {DomainEntity} from '../../../../domain/src/model/domain.entity';
import {IDomainDataBaseRepository} from '../../../../domain/src/interface/domain-database.repository';
import {UtilsDomainDatabase} from './utils';

export class DomainDataBaseRepository implements IDomainDataBaseRepository {
  private readonly collection: CollectionReference<DocumentData>;

  constructor(private readonly utilsDomainDatabase: UtilsDomainDatabase) {
    this.collection = firestoreClient.collection(
      this.utilsDomainDatabase.getCollectionName(),
    );
  }

  async getFeatureBy(PKDomain: string): Promise<DomainEntity[]> {
    const snapshot = await this.collection.where('PK', '==', PKDomain).get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new DomainEntity(data.email, data.name, {
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        PK: data.PK,
        SK: data.SK,
      });
    });
  }
}
