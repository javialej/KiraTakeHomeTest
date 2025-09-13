import {CollectionReference} from '@google-cloud/firestore';
import {firestoreClient} from './client.connection';
import {DomainEntity} from '../../../../domain/src/model/domain.entity';
import {IDomainDataBaseRepository} from '../../../../domain/src/interface/domain-database.repository';
import {UtilsDomainDatabase} from './utils';

export class DomainDataBaseRepository implements IDomainDataBaseRepository {
  private readonly collection: CollectionReference;

  constructor(private readonly utilsDomainDatabase: UtilsDomainDatabase) {
    this.collection = firestoreClient.collection(
      this.utilsDomainDatabase.getCollectionName()
    );
  }

  async getFeatureBy(PKDomain: string): Promise<DomainEntity[]> {
    const snapshot = await this.collection.where('PK', '==', PKDomain).get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new DomainEntity(data.email as string, data.name as string, {
        createdAt: data.createdAt as string,
        updatedAt: data.updatedAt as string,
        PK: data.PK as string,
        SK: data.SK as string,
      });
    });
  }
}
